import React, { useState } from 'react';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Modal from '@/Components/Admin/Modal';
import Toggle from '@/Components/Admin/Toggle';
import Pagination from '@/Components/Admin/Pagination';
import { RoleBadge, StatusBadge } from '@/Components/Admin/Badge';
import {
    Users,
    Trash2,
    Search,
    Plus,
    Edit2,
    RotateCcw,
    Shield,
    Check,
    X,
    UserCheck,
    UserX,
    Mail
} from 'lucide-react';

export default function Index({ users, filters, counts }) {
    const { auth } = usePage().props;
    const currentUserId = auth?.user?.id;

    const [search, setSearch] = useState(filters.search || '');
    const [roleFilter, setRoleFilter] = useState(filters.role || '');
    const currentTab = filters.tab || 'all';

    // Modal state for Create / Edit
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: '',
        username: '',
        email: '',
        user_type: 'user',
        password: '',
        is_active: true,
    });

    const handleFilter = (newSearch, newRole, newTab = currentTab) => {
        router.get(
            '/admin/users',
            {
                search: newSearch,
                role: newRole,
                tab: newTab,
            },
            { preserveState: true, replace: true }
        );
    };

    const handleSearchChange = (e) => {
        const val = e.target.value;
        setSearch(val);
        handleFilter(val, roleFilter, currentTab);
    };

    const handleRoleChange = (e) => {
        const val = e.target.value;
        setRoleFilter(val);
        handleFilter(search, val, currentTab);
    };

    const switchTab = (tab) => {
        handleFilter(search, roleFilter, tab);
    };

    const openCreateModal = () => {
        setEditingUser(null);
        reset();
        setData({
            name: '',
            username: '',
            email: '',
            user_type: 'user',
            password: '',
            is_active: true,
        });
        setIsModalOpen(true);
    };

    const openEditModal = (userItem) => {
        setEditingUser(userItem);
        setData({
            name: userItem.name,
            username: userItem.username || '',
            email: userItem.email,
            user_type: userItem.user_type,
            password: '',
            is_active: userItem.is_active,
        });
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingUser) {
            put(`/admin/users/${editingUser.id}`, {
                onSuccess: () => {
                    setIsModalOpen(false);
                    setEditingUser(null);
                },
            });
        } else {
            post('/admin/users', {
                onSuccess: () => {
                    setIsModalOpen(false);
                },
            });
        }
    };

    const handleToggleStatus = (userItem) => {
        if (userItem.id === currentUserId) return;
        router.patch(`/admin/users/${userItem.id}/toggle-status`, {}, { preserveScroll: true });
    };

    const handleDelete = (userItem) => {
        if (userItem.id === currentUserId) return;
        if (confirm(`Move user "${userItem.name}" to trash?`)) {
            router.delete(`/admin/users/${userItem.id}`, { preserveScroll: true });
        }
    };

    const handleRestore = (userItem) => {
        router.post(`/admin/users/${userItem.id}/restore`, {}, { preserveScroll: true });
    };

    const handleForceDelete = (userItem) => {
        if (confirm(`Permanently delete "${userItem.name}"? This action cannot be undone.`)) {
            router.delete(`/admin/users/${userItem.id}/force-delete`, { preserveScroll: true });
        }
    };

    const getInitials = (name) => {
        if (!name) return 'U';
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .substring(0, 2);
    };

    return (
        <AdminLayout title="Users">
            <Head title="Users Management — TTECH SUITES" />

            <div className="space-y-6">
                {/* Header Card with Tab Switchers */}
                <div className="rounded-2xl bg-[#0F172A] border border-slate-800/80 p-6 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                        <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400">
                            <Users className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white tracking-tight">
                                Users Management
                            </h2>
                            <p className="text-xs text-slate-400 mt-0.5">
                                Manage system users, administrators, supervisors, and soft-deleted accounts
                            </p>
                        </div>
                    </div>

                    {/* Tabs & Add User */}
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <div className="inline-flex rounded-xl p-1 bg-slate-900 border border-slate-800">
                            <button
                                onClick={() => switchTab('all')}
                                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                                    currentTab === 'all'
                                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                                        : 'text-slate-400 hover:text-white'
                                }`}
                            >
                                All Users ({counts.all})
                            </button>
                            <button
                                onClick={() => switchTab('trash')}
                                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                                    currentTab === 'trash'
                                        ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                                        : 'text-slate-400 hover:text-white'
                                }`}
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Trash ({counts.trash})</span>
                            </button>
                        </div>

                        {currentTab === 'all' && (
                            <button
                                onClick={openCreateModal}
                                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs tracking-wide bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white shadow-lg shadow-indigo-600/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                            >
                                <Plus className="w-4 h-4" />
                                <span>Add User</span>
                            </button>
                        )}
                    </div>
                </div>

                {/* Filter & Search Bar */}
                <div className="rounded-2xl bg-[#0F172A] border border-slate-800/80 p-4 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Search Input */}
                    <div className="relative w-full md:w-96">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                            <Search className="w-4 h-4" />
                        </div>
                        <input
                            type="text"
                            value={search}
                            onChange={handleSearchChange}
                            placeholder="Search users by name, username, email..."
                            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                        />
                    </div>

                    {/* Role Filter */}
                    <div className="w-full md:w-auto">
                        <select
                            value={roleFilter}
                            onChange={handleRoleChange}
                            className="w-full md:w-auto px-3.5 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                        >
                            <option value="">All Roles</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                    </div>
                </div>

                {/* Data Table */}
                <div className="rounded-2xl bg-[#0F172A] border border-slate-800/80 shadow-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-800/60 bg-slate-900/40 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                                    <th className="py-3.5 px-6">USER</th>
                                    <th className="py-3.5 px-6">USERNAME</th>
                                    <th className="py-3.5 px-6">EMAIL</th>
                                    <th className="py-3.5 px-6">ROLE</th>
                                    <th className="py-3.5 px-6">STATUS</th>
                                    <th className="py-3.5 px-6">ACTIVE</th>
                                    <th className="py-3.5 px-6">
                                        {currentTab === 'trash' ? 'DELETED AT' : 'REGISTERED AT'}
                                    </th>
                                    <th className="py-3.5 px-6 text-right">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/40 text-xs">
                                {users.data && users.data.length > 0 ? (
                                    users.data.map((item) => {
                                        const isSelf = item.id === currentUserId;
                                        return (
                                            <tr key={item.id} className="hover:bg-slate-800/30 transition-colors">
                                                <td className="py-3.5 px-6">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 ring-2 ring-blue-500/20">
                                                            {getInitials(item.name)}
                                                        </div>
                                                        <div>
                                                            <div className="font-semibold text-slate-200">
                                                                {item.name}
                                                            </div>
                                                            <div className="text-[10px] text-slate-500 font-mono">
                                                                ID: #{item.id}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-3.5 px-6 font-mono text-slate-400">
                                                    {item.username}
                                                </td>
                                                <td className="py-3.5 px-6 text-slate-300">
                                                    {item.email}
                                                </td>
                                                <td className="py-3.5 px-6">
                                                    <RoleBadge role={item.user_type} />
                                                </td>
                                                <td className="py-3.5 px-6">
                                                    <StatusBadge isVerified={item.is_verified} />
                                                </td>
                                                <td className="py-3.5 px-6">
                                                    <Toggle
                                                        enabled={item.is_active}
                                                        disabled={isSelf || currentTab === 'trash'}
                                                        onChange={() => handleToggleStatus(item)}
                                                    />
                                                </td>
                                                <td className="py-3.5 px-6 text-slate-400 font-medium whitespace-nowrap">
                                                    {currentTab === 'trash' ? item.deleted_at : item.created_at}
                                                </td>
                                                <td className="py-3.5 px-6 text-right">
                                                    {currentTab === 'all' ? (
                                                        <div className="flex items-center justify-end gap-2">
                                                            <button
                                                                onClick={() => openEditModal(item)}
                                                                className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/10 transition-colors"
                                                                title="Edit User"
                                                            >
                                                                <Edit2 className="w-4 h-4" />
                                                            </button>
                                                            {isSelf ? (
                                                                <span className="text-[11px] text-slate-500 font-medium px-2 py-1 bg-slate-900 rounded-md">
                                                                    You
                                                                </span>
                                                            ) : (
                                                                <button
                                                                    onClick={() => handleDelete(item)}
                                                                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                                                                    title="Delete User"
                                                                >
                                                                    <Trash2 className="w-4 h-4" />
                                                                </button>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center justify-end gap-2">
                                                            <button
                                                                onClick={() => handleRestore(item)}
                                                                className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20 font-semibold flex items-center gap-1 text-[11px] transition-colors"
                                                                title="Restore Account"
                                                            >
                                                                <RotateCcw className="w-3 h-3" />
                                                                <span>Restore</span>
                                                            </button>
                                                            <button
                                                                onClick={() => handleForceDelete(item)}
                                                                className="px-2.5 py-1 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/20 font-semibold flex items-center gap-1 text-[11px] transition-colors"
                                                                title="Delete Permanently"
                                                            >
                                                                <Trash2 className="w-3 h-3" />
                                                                <span>Permanent</span>
                                                            </button>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="py-16 text-center text-slate-500">
                                            <Users className="w-10 h-10 mx-auto text-slate-600 mb-2 opacity-60" />
                                            <p className="font-semibold text-sm">
                                                {currentTab === 'trash' ? 'Trash is empty.' : 'No users found matching criteria.'}
                                            </p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <Pagination
                        links={users.links}
                        from={users.from}
                        to={users.to}
                        total={users.total}
                    />
                </div>
            </div>

            {/* Create / Edit User Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingUser ? `Edit User: ${editingUser.name}` : 'Add New System User'}
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                            Full Name *
                        </label>
                        <input
                            type="text"
                            required
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="John Doe"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-indigo-500"
                        />
                        {errors.name && <p className="text-xs text-rose-400 mt-1">{errors.name}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                                Username
                            </label>
                            <input
                                type="text"
                                value={data.username}
                                onChange={(e) => setData('username', e.target.value)}
                                placeholder="johndoe"
                                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-indigo-500"
                            />
                            {errors.username && <p className="text-xs text-rose-400 mt-1">{errors.username}</p>}
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                                User Type (Role) *
                            </label>
                            <select
                                value={data.user_type}
                                onChange={(e) => setData('user_type', e.target.value)}
                                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-indigo-500"
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                            Email Address *
                        </label>
                        <input
                            type="email"
                            required
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="john@example.com"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-indigo-500"
                        />
                        {errors.email && <p className="text-xs text-rose-400 mt-1">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                            Password {editingUser && '(leave blank to keep current)'}
                        </label>
                        <input
                            type="password"
                            required={!editingUser}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder={editingUser ? '••••••••' : 'Minimum 8 characters'}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-indigo-500"
                        />
                        {errors.password && <p className="text-xs text-rose-400 mt-1">{errors.password}</p>}
                    </div>

                    <div className="flex items-center justify-between pt-3">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={data.is_active}
                                onChange={(e) => setData('is_active', e.target.checked)}
                                className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-indigo-500"
                            />
                            <span className="text-xs font-semibold text-slate-300">Active Account</span>
                        </label>

                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 rounded-xl border border-slate-700 text-xs font-semibold text-slate-300 hover:bg-slate-800"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold uppercase tracking-wider transition-all disabled:opacity-50"
                            >
                                {editingUser ? 'Save Changes' : 'Create User'}
                            </button>
                        </div>
                    </div>
                </form>
            </Modal>
        </AdminLayout>
    );
}
