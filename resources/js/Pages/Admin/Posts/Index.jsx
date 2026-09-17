import React, { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Modal from '@/Components/Admin/Modal';
import Pagination from '@/Components/Admin/Pagination';
import { StatusBadge } from '@/Components/Admin/Badge';
import {
    FileText,
    Plus,
    Search,
    Filter,
    Star,
    Edit2,
    Trash2,
    Eye,
    Check,
    X,
    Clock,
    Tag
} from 'lucide-react';

export default function Index({ posts, categories, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [categoryFilter, setCategoryFilter] = useState(filters.category_id || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');

    // Modal state for Create / Edit
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPost, setEditingPost] = useState(null);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        title: '',
        category_id: '',
        summary: '',
        content: '',
        cover_image: '',
        tags: '',
        read_time: 5,
        is_featured: false,
        status: 'published',
    });

    const handleFilter = (newSearch, newCategory, newStatus) => {
        router.get(
            '/admin/posts',
            {
                search: newSearch,
                category_id: newCategory,
                status: newStatus,
            },
            { preserveState: true, replace: true }
        );
    };

    const handleSearchChange = (e) => {
        const val = e.target.value;
        setSearch(val);
        handleFilter(val, categoryFilter, statusFilter);
    };

    const handleCategoryChange = (e) => {
        const val = e.target.value;
        setCategoryFilter(val);
        handleFilter(search, val, statusFilter);
    };

    const handleStatusChange = (e) => {
        const val = e.target.value;
        setStatusFilter(val);
        handleFilter(search, categoryFilter, val);
    };

    const openCreateModal = () => {
        setEditingPost(null);
        reset();
        setData({
            title: '',
            category_id: categories[0]?.id || '',
            summary: '',
            content: '',
            cover_image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80',
            tags: 'development,design',
            read_time: 5,
            is_featured: false,
            status: 'published',
        });
        setIsModalOpen(true);
    };

    const openEditModal = (postItem) => {
        setEditingPost(postItem);
        setData({
            title: postItem.title,
            category_id: postItem.category_id || '',
            summary: postItem.summary || '',
            content: postItem.content || '',
            cover_image: postItem.cover_image || '',
            tags: Array.isArray(postItem.tags) ? postItem.tags.join(',') : (postItem.tags || ''),
            read_time: postItem.read_time || 5,
            is_featured: postItem.is_featured,
            status: postItem.status,
        });
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingPost) {
            put(`/admin/posts/${editingPost.id}`, {
                onSuccess: () => {
                    setIsModalOpen(false);
                    setEditingPost(null);
                },
            });
        } else {
            post('/admin/posts', {
                onSuccess: () => {
                    setIsModalOpen(false);
                },
            });
        }
    };

    const toggleFeatured = (postItem) => {
        router.patch(`/admin/posts/${postItem.id}/toggle-featured`, {}, { preserveScroll: true });
    };

    const toggleStatus = (postItem) => {
        router.patch(`/admin/posts/${postItem.id}/toggle-status`, {}, { preserveScroll: true });
    };

    const handleDelete = (postItem) => {
        if (confirm(`Are you sure you want to delete "${postItem.title}"?`)) {
            router.delete(`/admin/posts/${postItem.id}`, { preserveScroll: true });
        }
    };

    return (
        <AdminLayout title="Blog Posts">
            <Head title="Blog Articles Listing — TTECH SUITES" />

            <div className="space-y-6">
                {/* Header Card */}
                <div className="rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800/80 p-6 shadow-sm dark:shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                        <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                            <FileText className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                                Blog Articles Listing
                            </h2>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                Search, filter, arrange, and manage your system blog articles
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={openCreateModal}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs tracking-wide bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white shadow-lg shadow-indigo-600/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Create Article</span>
                    </button>
                </div>

                {/* Filter & Search Bar */}
                <div className="rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800/80 p-4 shadow-sm dark:shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Search Input */}
                    <div className="relative w-full md:w-96">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
                            <Search className="w-4 h-4" />
                        </div>
                        <input
                            type="text"
                            value={search}
                            onChange={handleSearchChange}
                            placeholder="Search by title, tags, or content..."
                            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                        />
                    </div>

                    {/* Filter Dropdowns */}
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <select
                            value={categoryFilter}
                            onChange={handleCategoryChange}
                            className="px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                        >
                            <option value="">All Categories</option>
                            {categories.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>

                        <select
                            value={statusFilter}
                            onChange={handleStatusChange}
                            className="px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                        >
                            <option value="">All Statuses</option>
                            <option value="published">Published</option>
                            <option value="draft">Draft</option>
                        </select>
                    </div>
                </div>

                {/* Data Table Container */}
                <div className="rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800/80 shadow-sm dark:shadow-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-200 dark:border-slate-800/60 bg-slate-50/75 dark:bg-slate-900/40 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                    <th className="py-3 px-6">COVER</th>
                                    <th className="py-3 px-6">TITLE</th>
                                    <th className="py-3 px-6">CATEGORY</th>
                                    <th className="py-3 px-6">TAGS</th>
                                    <th className="py-3 px-6">READ TIME</th>
                                    <th className="py-3 px-6">FEATURED</th>
                                    <th className="py-3 px-6">STATUS</th>
                                    <th className="py-3 px-6">PUBLISHED AT</th>
                                    <th className="py-3 px-6 text-right">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/40 text-xs">
                                {posts.data && posts.data.length > 0 ? (
                                    posts.data.map((item) => (
                                        <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                            <td className="py-3 px-6">
                                                <img
                                                    src={item.cover_image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=120&q=80'}
                                                    alt={item.title}
                                                    className="w-12 h-9 rounded-lg object-cover border border-slate-200 dark:border-slate-800 shadow-sm"
                                                />
                                            </td>
                                            <td className="py-3 px-6 max-w-xs">
                                                <div className="font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">
                                                    {item.title}
                                                </div>
                                                <div className="text-[11px] text-slate-500 truncate mt-0.5">
                                                    By {item.author}
                                                </div>
                                            </td>
                                            <td className="py-3 px-6">
                                                <span
                                                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold"
                                                    style={{
                                                        backgroundColor: `${item.category_color}20`,
                                                        color: item.category_color,
                                                        border: `1px solid ${item.category_color}40`,
                                                    }}
                                                >
                                                    {item.category}
                                                </span>
                                            </td>
                                            <td className="py-3 px-6">
                                                <div className="flex flex-wrap gap-1 max-w-[150px]">
                                                    {item.tags?.map((t, idx) => (
                                                        <span
                                                            key={idx}
                                                            className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800/80 text-[10px] text-slate-600 dark:text-slate-400 font-medium"
                                                        >
                                                            #{t.trim()}
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="py-3 px-6 text-slate-700 dark:text-slate-300 font-medium whitespace-nowrap">
                                                {item.read_time} mins
                                            </td>
                                            <td className="py-3 px-6">
                                                <button
                                                    onClick={() => toggleFeatured(item)}
                                                    title={item.is_featured ? 'Unmark featured' : 'Mark featured'}
                                                    className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                                                        item.is_featured
                                                            ? 'border-indigo-500/30 bg-indigo-500/15 text-indigo-600 dark:text-indigo-400'
                                                            : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                                                    }`}
                                                >
                                                    <Star className="w-3.5 h-3.5 fill-current" />
                                                </button>
                                            </td>
                                            <td className="py-3 px-6">
                                                <button
                                                    onClick={() => toggleStatus(item)}
                                                    className="focus:outline-none cursor-pointer"
                                                    title="Click to toggle status"
                                                >
                                                    <StatusBadge status={item.status} />
                                                </button>
                                            </td>
                                            <td className="py-3 px-6 text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap">
                                                {item.published_at}
                                            </td>
                                            <td className="py-3 px-6 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => openEditModal(item)}
                                                        className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors cursor-pointer"
                                                        title="Edit Article"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(item)}
                                                        className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors cursor-pointer"
                                                        title="Delete Article"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="9" className="py-16 text-center text-slate-500">
                                            <FileText className="w-10 h-10 mx-auto text-slate-400 dark:text-slate-600 mb-2 opacity-60" />
                                            <p className="font-semibold text-sm">No articles match your search or filter criteria.</p>
                                            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Showing 0 total article(s)</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <Pagination
                        links={posts.links}
                        from={posts.from}
                        to={posts.to}
                        total={posts.total}
                    />
                </div>
            </div>

            {/* Create / Edit Article Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingPost ? 'Edit Blog Article' : 'Create New Blog Article'}
                maxWidth="max-w-2xl"
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                            Article Title *
                        </label>
                        <input
                            type="text"
                            required
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            placeholder="e.g. Modern Architecture with Inertia and Laravel"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                        />
                        {errors.title && <p className="text-xs text-rose-500 mt-1">{errors.title}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                                Category
                            </label>
                            <select
                                value={data.category_id}
                                onChange={(e) => setData('category_id', e.target.value)}
                                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                            >
                                <option value="">Select Category</option>
                                {categories.map((c) => (
                                    <option key={c.id} value={c.id}>
                                        {c.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                                Estimated Read Time (mins)
                            </label>
                            <input
                                type="number"
                                min="1"
                                value={data.read_time}
                                onChange={(e) => setData('read_time', parseInt(e.target.value) || 1)}
                                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                                Cover Image URL
                            </label>
                            <input
                                type="text"
                                value={data.cover_image}
                                onChange={(e) => setData('cover_image', e.target.value)}
                                placeholder="https://..."
                                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                                Tags (comma separated)
                            </label>
                            <input
                                type="text"
                                value={data.tags}
                                onChange={(e) => setData('tags', e.target.value)}
                                placeholder="laravel,react,cloud"
                                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                            Article Summary
                        </label>
                        <textarea
                            rows={2}
                            value={data.summary}
                            onChange={(e) => setData('summary', e.target.value)}
                            placeholder="Short excerpt for social and listing previews..."
                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                            Article Content
                        </label>
                        <textarea
                            rows={5}
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                            placeholder="Write full article markdown or body text..."
                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                        />
                    </div>

                    <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-6">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={data.is_featured}
                                    onChange={(e) => setData('is_featured', e.target.checked)}
                                    className="w-4 h-4 rounded border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-indigo-600 focus:ring-indigo-500"
                                />
                                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Featured Post</span>
                            </label>

                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="status"
                                    value="published"
                                    checked={data.status === 'published'}
                                    onChange={() => setData('status', 'published')}
                                    className="text-indigo-600 focus:ring-indigo-500"
                                />
                                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Published</span>
                            </label>

                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="status"
                                    value="draft"
                                    checked={data.status === 'draft'}
                                    onChange={() => setData('status', 'draft')}
                                    className="text-indigo-600 focus:ring-indigo-500"
                                />
                                <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">Draft</span>
                            </label>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer"
                            >
                                {editingPost ? 'Save Changes' : 'Publish Article'}
                            </button>
                        </div>
                    </div>
                </form>
            </Modal>
        </AdminLayout>
    );
}
