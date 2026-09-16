<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Post;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the admin dashboard.
     */
    public function index(): Response
    {
        $totalArticles = Post::count();
        $featuredPosts = Post::where('is_featured', true)->count();
        $draftMode = Post::where('status', 'draft')->count();
        $avgReadTime = (int) round(Post::avg('read_time') ?? 0);

        $recentArticles = Post::with(['category:id,name,color', 'user:id,name,username'])
            ->latest()
            ->take(5)
            ->get()
            ->map(fn (Post $post) => [
                'id' => $post->id,
                'title' => $post->title,
                'slug' => $post->slug,
                'cover_image' => $post->cover_image,
                'category' => $post->category?->name ?? 'Uncategorized',
                'category_color' => $post->category?->color ?? '#3b82f6',
                'status' => $post->status,
                'published_at' => $post->published_at?->format('M d, Y H:i') ?? 'Draft',
            ]);

        $categoryStats = Category::withCount('posts')
            ->get()
            ->map(fn (Category $cat) => [
                'id' => $cat->id,
                'name' => $cat->name,
                'color' => $cat->color,
                'count' => $cat->posts_count,
            ]);

        $stats = [
            'totalArticles' => $totalArticles,
            'featuredPosts' => $featuredPosts,
            'draftMode' => $draftMode,
            'avgReadTime' => $avgReadTime,
            'totalUsers' => User::count(),
            'activeUsers' => User::where('is_active', true)->count(),
        ];

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recentArticles' => $recentArticles,
            'categoryStats' => $categoryStats,
        ]);
    }

    /**
     * Display companies management (scaffolded placeholder).
     */
    public function companies(): Response
    {
        return Inertia::render('Admin/Companies/Index');
    }

    /**
     * Display supervisors management.
     */
    public function supervisors(): Response
    {
        $supervisors = User::where('user_type', 'admin')
            ->latest()
            ->get(['id', 'name', 'username', 'email', 'is_active', 'created_at']);

        return Inertia::render('Admin/Supervisors/Index', [
            'supervisors' => $supervisors,
        ]);
    }
}
