<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    /**
     * Display a listing of users with search and filter capabilities.
     */
    public function index(Request $request): Response
    {
        $tab = $request->input('tab', 'all');
        $search = $request->input('search');
        $role = $request->input('role');

        $query = $tab === 'trash'
            ? User::onlyTrashed()
            : User::query();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('username', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        if ($role && in_array($role, ['admin', 'user'])) {
            $query->where('user_type', $role);
        }

        $users = $query->latest('id')
            ->paginate(10)
            ->withQueryString()
            ->through(fn (User $u) => [
                'id' => $u->id,
                'name' => $u->name,
                'username' => $u->username ?? explode('@', $u->email)[0],
                'email' => $u->email,
                'user_type' => $u->user_type,
                'is_active' => $u->is_active,
                'avatar' => $u->avatar,
                'is_verified' => $u->email_verified_at !== null,
                'created_at' => $u->created_at?->format('M d, Y H:i') ?? 'N/A',
                'deleted_at' => $u->deleted_at?->format('M d, Y H:i'),
            ]);

        $counts = [
            'all' => User::count(),
            'trash' => User::onlyTrashed()->count(),
        ];

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
            'filters' => [
                'tab' => $tab,
                'search' => $search ?? '',
                'role' => $role ?? '',
            ],
            'counts' => $counts,
        ]);
    }

    /**
     * Store a newly created user in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'username' => ['nullable', 'string', 'max:255', 'unique:users,username'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'user_type' => ['required', Rule::in(['user', 'admin'])],
            'password' => ['required', 'string', 'min:8'],
            'is_active' => ['boolean'],
        ]);

        $validated['password'] = Hash::make($validated['password']);
        $validated['email_verified_at'] = now();
        $validated['is_active'] = $request->boolean('is_active', true);

        User::create($validated);

        return back()->with('success', 'User created successfully.');
    }

    /**
     * Update the specified user in storage.
     */
    public function update(Request $request, User $user): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'username' => ['nullable', 'string', 'max:255', Rule::unique('users', 'username')->ignore($user->id)],
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users', 'email')->ignore($user->id)],
            'user_type' => ['required', Rule::in(['user', 'admin'])],
            'password' => ['nullable', 'string', 'min:8'],
            'is_active' => ['boolean'],
        ]);

        if (! empty($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        } else {
            unset($validated['password']);
        }

        $validated['is_active'] = $request->boolean('is_active', true);

        $user->update($validated);

        return back()->with('success', 'User updated successfully.');
    }

    /**
     * Toggle the active status of the specified user.
     */
    public function toggleStatus(Request $request, User $user): RedirectResponse
    {
        if ($user->id === $request->user()->id) {
            return back()->with('error', 'You cannot change your own active status.');
        }

        $user->update(['is_active' => ! $user->is_active]);

        $statusText = $user->is_active ? 'activated' : 'deactivated';

        return back()->with('success', "User account {$statusText}.");
    }

    /**
     * Soft delete the specified user.
     */
    public function destroy(Request $request, User $user): RedirectResponse
    {
        if ($user->id === $request->user()->id) {
            return back()->with('error', 'You cannot delete your own account.');
        }

        $user->delete();

        return back()->with('success', 'User moved to trash.');
    }

    /**
     * Restore the specified soft-deleted user.
     */
    public function restore(int|string $id): RedirectResponse
    {
        $user = User::onlyTrashed()->findOrFail($id);
        $user->restore();

        return back()->with('success', 'User restored successfully.');
    }

    /**
     * Permanently delete the specified soft-deleted user.
     */
    public function forceDelete(int|string $id): RedirectResponse
    {
        $user = User::onlyTrashed()->findOrFail($id);
        $user->forceDelete();

        return back()->with('success', 'User permanently removed.');
    }
}
