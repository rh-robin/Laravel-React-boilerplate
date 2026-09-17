import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import StatCard from '@/Components/Admin/StatCard';
import { StatusBadge } from '@/Components/Admin/Badge';
import {
    FileText,
    Star,
    Edit3,
    Clock,
    PieChart,
    ArrowUpRight,
    Plus,
    ExternalLink,
    ChevronRight,
    Users,
    TrendingUp
} from 'lucide-react';

export default function Dashboard({ stats, recentArticles, categoryStats }) {
    const totalCategoryPosts = categoryStats?.reduce((acc, curr) => acc + curr.count, 0) || 1;

    return (
        <AdminLayout title="Dashboard">
            <Head title="Admin Dashboard — TTECH SUITES" />

            <div className="space-y-8">
                {/* Top 4 Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    <StatCard
                        title="TOTAL ARTICLES"
                        value={stats.totalArticles}
                        subtitle="Across all seeded categories"
                        icon={FileText}
                        iconColor="text-sky-500 dark:text-sky-400"
                        iconBg="bg-sky-500/10"
                    />

                    <StatCard
                        title="FEATURED POSTS"
                        value={stats.featuredPosts}
                        subtitle="Highlighted on user homepages"
                        icon={Star}
                        iconColor="text-indigo-500 dark:text-indigo-400"
                        iconBg="bg-indigo-500/10"
                    />

                    <StatCard
                        title="DRAFT MODE"
                        value={stats.draftMode}
                        subtitle="Work in progress content"
                        icon={Edit3}
                        iconColor="text-amber-500 dark:text-amber-400"
                        iconBg="bg-amber-500/10"
                    />

                    <StatCard
                        title="AVG READ TIME"
                        value={`${stats.avgReadTime} mins`}
                        subtitle="Encourages reader engagement"
                        icon={Clock}
                        iconColor="text-emerald-500 dark:text-emerald-400"
                        iconBg="bg-emerald-500/10"
                    />
                </div>

                {/* Main Content: Recent Articles Log + Category Stats */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left: Recent Articles Log (2 columns width on large screens) */}
                    <div className="lg:col-span-2 rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800/80 shadow-sm dark:shadow-xl overflow-hidden flex flex-col justify-between">
                        <div>
                            {/* Card Header */}
                            <div className="p-6 border-b border-slate-200 dark:border-slate-800/80 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                                        <Edit3 className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 dark:text-white text-base">Recent Articles Log</h3>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">
                                            A quick snapshot of the 5 most recently created blog posts
                                        </p>
                                    </div>
                                </div>

                                <Link
                                    href="/admin/posts"
                                    className="px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700/60 bg-slate-50 dark:bg-slate-900/60 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-600 transition-colors flex items-center gap-1.5"
                                >
                                    <span>View All</span>
                                    <ChevronRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>

                            {/* Table */}
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-slate-200 dark:border-slate-800/60 bg-slate-50/75 dark:bg-slate-900/40 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                            <th className="py-3 px-6">COVER</th>
                                            <th className="py-3 px-6">TITLE</th>
                                            <th className="py-3 px-6">CATEGORY</th>
                                            <th className="py-3 px-6">STATUS</th>
                                            <th className="py-3 px-6">PUBLISHED AT</th>
                                            <th className="py-3 px-6 text-right">ACTION</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/40 text-xs">
                                        {recentArticles && recentArticles.length > 0 ? (
                                            recentArticles.map((post) => (
                                                <tr key={post.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                                    <td className="py-3.5 px-6">
                                                        <img
                                                            src={post.cover_image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=120&q=80'}
                                                            alt={post.title}
                                                            className="w-12 h-9 rounded-lg object-cover border border-slate-200 dark:border-slate-800 shadow-sm"
                                                        />
                                                    </td>
                                                    <td className="py-3.5 px-6 max-w-xs">
                                                        <span className="font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">
                                                            {post.title}
                                                        </span>
                                                    </td>
                                                    <td className="py-3.5 px-6">
                                                        <span
                                                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold"
                                                            style={{ backgroundColor: `${post.category_color}20`, color: post.category_color, border: `1px solid ${post.category_color}40` }}
                                                        >
                                                            {post.category}
                                                        </span>
                                                    </td>
                                                    <td className="py-3.5 px-6">
                                                        <StatusBadge status={post.status} />
                                                    </td>
                                                    <td className="py-3.5 px-6 text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap">
                                                        {post.published_at}
                                                    </td>
                                                    <td className="py-3.5 px-6 text-right">
                                                        <Link
                                                            href="/admin/posts"
                                                            className="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 font-semibold"
                                                        >
                                                            <span>Manage</span>
                                                            <ArrowUpRight className="w-3.5 h-3.5" />
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="6" className="py-12 text-center text-slate-500 font-medium">
                                                    No posts found in the database. Go ahead and create one!
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Card Footer Quick Link */}
                        <div className="p-4 border-t border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                            <span>Showing {recentArticles.length} recent entries</span>
                            <Link
                                href="/admin/posts"
                                className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
                            >
                                Open Post Manager &rarr;
                            </Link>
                        </div>
                    </div>

                    {/* Right: Category Stats Distribution */}
                    <div className="rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800/80 shadow-sm dark:shadow-xl overflow-hidden flex flex-col justify-between">
                        <div className="p-6">
                            {/* Card Header */}
                            <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-slate-800/80">
                                <div className="p-2 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400">
                                    <PieChart className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 dark:text-white text-base">Category Stats</h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Decoupled distribution</p>
                                </div>
                            </div>

                            {/* Category Distribution Items */}
                            <div className="mt-6 space-y-4">
                                {categoryStats && categoryStats.length > 0 ? (
                                    categoryStats.map((category) => {
                                        const percentage = Math.round((category.count / totalCategoryPosts) * 100);
                                        return (
                                            <div key={category.id} className="space-y-1.5">
                                                <div className="flex items-center justify-between text-xs font-semibold">
                                                    <span className="text-slate-800 dark:text-slate-200 flex items-center gap-2">
                                                        <span
                                                            className="w-2.5 h-2.5 rounded-full"
                                                            style={{ backgroundColor: category.color }}
                                                        />
                                                        {category.name}
                                                    </span>
                                                    <span className="text-slate-500 dark:text-slate-400">
                                                        {category.count} posts ({percentage}%)
                                                    </span>
                                                </div>
                                                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800/80 overflow-hidden">
                                                    <div
                                                        className="h-full rounded-full transition-all duration-500"
                                                        style={{
                                                            width: `${percentage}%`,
                                                            backgroundColor: category.color,
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <p className="text-center py-8 text-xs text-slate-500 font-medium">
                                        No category data available.
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Card Footer Quick Link */}
                        <div className="p-4 border-t border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                            <span>{categoryStats.length} total categories</span>
                            <Link href="/admin/categories" className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold">
                                Manage Categories &rarr;
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
