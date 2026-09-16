<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Post;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    /**
     * Display a listing of blog posts with filters.
     */
    public function index(Request $request): Response
    {
        $search = $request->input('search');
        $categoryId = $request->input('category_id');
        $status = $request->input('status');

        $query = Post::with(['category:id,name,color', 'user:id,name']);

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('tags', 'like', "%{$search}%")
                    ->orWhere('summary', 'like', "%{$search}%");
            });
        }

        if ($categoryId) {
            $query->where('category_id', $categoryId);
        }

        if ($status && in_array($status, ['published', 'draft'])) {
            $query->where('status', $status);
        }

        $posts = $query->latest('id')
            ->paginate(10)
            ->withQueryString()
            ->through(fn (Post $p) => [
                'id' => $p->id,
                'title' => $p->title,
                'slug' => $p->slug,
                'category_id' => $p->category_id,
                'category' => $p->category?->name ?? 'Uncategorized',
                'category_color' => $p->category?->color ?? '#3b82f6',
                'author' => $p->user?->name ?? 'Admin',
                'cover_image' => $p->cover_image,
                'tags' => $p->tags ? explode(',', $p->tags) : [],
                'read_time' => $p->read_time,
                'is_featured' => $p->is_featured,
                'status' => $p->status,
                'summary' => $p->summary,
                'content' => $p->content,
                'published_at' => $p->published_at?->format('M d, Y H:i') ?? 'Not Published',
            ]);

        $categories = Category::orderBy('name')->get(['id', 'name', 'color']);

        return Inertia::render('Admin/Posts/Index', [
            'posts' => $posts,
            'categories' => $categories,
            'filters' => [
                'search' => $search ?? '',
                'category_id' => $categoryId ?? '',
                'status' => $status ?? '',
            ],
        ]);
    }

    /**
     * Store a newly created post in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'category_id' => ['nullable', 'exists:categories,id'],
            'summary' => ['nullable', 'string', 'max:500'],
            'content' => ['nullable', 'string'],
            'cover_image' => ['nullable', 'string'],
            'tags' => ['nullable', 'string'],
            'read_time' => ['nullable', 'integer', 'min:1'],
            'is_featured' => ['boolean'],
            'status' => ['required', 'in:draft,published'],
        ]);

        $validated['user_id'] = $request->user()->id;
        $validated['slug'] = Str::slug($validated['title']).'-'.Str::random(5);
        $validated['is_featured'] = $request->boolean('is_featured');
        $validated['read_time'] = $validated['read_time'] ?? 5;
        $validated['published_at'] = $validated['status'] === 'published' ? now() : null;

        Post::create($validated);

        return back()->with('success', 'Article created successfully.');
    }

    /**
     * Update the specified post in storage.
     */
    public function update(Request $request, Post $post): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'category_id' => ['nullable', 'exists:categories,id'],
            'summary' => ['nullable', 'string', 'max:500'],
            'content' => ['nullable', 'string'],
            'cover_image' => ['nullable', 'string'],
            'tags' => ['nullable', 'string'],
            'read_time' => ['nullable', 'integer', 'min:1'],
            'is_featured' => ['boolean'],
            'status' => ['required', 'in:draft,published'],
        ]);

        $validated['is_featured'] = $request->boolean('is_featured');

        if ($validated['status'] === 'published' && ! $post->published_at) {
            $validated['published_at'] = now();
        }

        $post->update($validated);

        return back()->with('success', 'Article updated successfully.');
    }

    /**
     * Toggle featured status of the post.
     */
    public function toggleFeatured(Post $post): RedirectResponse
    {
        $post->update(['is_featured' => ! $post->is_featured]);

        return back()->with('success', 'Featured status updated.');
    }

    /**
     * Toggle draft/published status of the post.
     */
    public function toggleStatus(Post $post): RedirectResponse
    {
        $newStatus = $post->status === 'published' ? 'draft' : 'published';
        $post->update([
            'status' => $newStatus,
            'published_at' => $newStatus === 'published' ? ($post->published_at ?? now()) : null,
        ]);

        return back()->with('success', "Article set to {$newStatus}.");
    }

    /**
     * Remove the specified post from storage.
     */
    public function destroy(Post $post): RedirectResponse
    {
        $post->delete();

        return back()->with('success', 'Article deleted successfully.');
    }
}
