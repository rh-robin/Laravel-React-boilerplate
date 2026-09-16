import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import {
    Settings,
    ArrowLeft,
    User,
    Shield,
    Lock,
    Mail,
    CheckCircle2,
    Key
} from 'lucide-react';

export default function Index({ user }) {
    // Form for Personal Info
    const profileForm = useForm({
        name: user.name || '',
        username: user.username || '',
        email: user.email || '',
    });

    // Form for Password Security
    const passwordForm = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const handleProfileSubmit = (e) => {
        e.preventDefault();
        profileForm.patch('/admin/settings/profile', {
            preserveScroll: true,
        });
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        passwordForm.put('/admin/settings/password', {
            preserveScroll: true,
            onSuccess: () => passwordForm.reset(),
        });
    };

    return (
        <AdminLayout title="Profile Settings">
            <Head title="Admin Profile Settings — TTECH SUITES" />

            <div className="space-y-6">
                {/* Header Card */}
                <div className="rounded-2xl bg-[#0F172A] border border-slate-800/80 p-6 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                        <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400">
                            <Settings className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white tracking-tight">
                                Admin Profile Settings
                            </h2>
                            <p className="text-xs text-slate-400 mt-0.5">
                                Manage your personal account credentials, email contact, and secure passkey
                            </p>
                        </div>
                    </div>

                    <Link
                        href="/admin"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-700/80 bg-slate-900/80 hover:bg-slate-800 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Back to Dashboard</span>
                    </Link>
                </div>

                {/* Two Columns: Personal Info & Account Security */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Card: Personal Information */}
                    <div className="rounded-2xl bg-[#0F172A] border border-slate-800/80 p-6 sm:p-8 shadow-xl flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-3 pb-4 border-b border-slate-800/80">
                                <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400">
                                    <User className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white text-base">Personal Information</h3>
                                    <p className="text-xs text-slate-400">
                                        Update your public display name and account email address
                                    </p>
                                </div>
                            </div>

                            <form onSubmit={handleProfileSubmit} id="profile-form" className="mt-6 space-y-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={profileForm.data.name}
                                        onChange={(e) => profileForm.setData('name', e.target.value)}
                                        placeholder="e.g. Alexander Pierce"
                                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                    />
                                    {profileForm.errors.name && (
                                        <p className="text-xs text-rose-400 mt-1">{profileForm.errors.name}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        value={profileForm.data.username}
                                        onChange={(e) => profileForm.setData('username', e.target.value)}
                                        placeholder="admin"
                                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                    />
                                    {profileForm.errors.username && (
                                        <p className="text-xs text-rose-400 mt-1">{profileForm.errors.username}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={profileForm.data.email}
                                        onChange={(e) => profileForm.setData('email', e.target.value)}
                                        placeholder="admin@admin.com"
                                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                    />
                                    {profileForm.errors.email && (
                                        <p className="text-xs text-rose-400 mt-1">{profileForm.errors.email}</p>
                                    )}
                                </div>
                            </form>
                        </div>

                        <div className="mt-8 pt-4 border-t border-slate-800/80 flex justify-end">
                            <button
                                type="submit"
                                form="profile-form"
                                disabled={profileForm.processing}
                                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-indigo-600/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
                            >
                                Save Information
                            </button>
                        </div>
                    </div>

                    {/* Right Card: Account Security */}
                    <div className="rounded-2xl bg-[#0F172A] border border-slate-800/80 p-6 sm:p-8 shadow-xl flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-3 pb-4 border-b border-slate-800/80">
                                <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400">
                                    <Shield className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white text-base">Account Security</h3>
                                    <p className="text-xs text-slate-400">
                                        Change your account password. Requires verification
                                    </p>
                                </div>
                            </div>

                            <form onSubmit={handlePasswordSubmit} id="password-form" className="mt-6 space-y-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                                        Current Password *
                                    </label>
                                    <input
                                        type="password"
                                        required
                                        value={passwordForm.data.current_password}
                                        onChange={(e) => passwordForm.setData('current_password', e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                    />
                                    {passwordForm.errors.current_password && (
                                        <p className="text-xs text-rose-400 mt-1">{passwordForm.errors.current_password}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                                        New Password *
                                    </label>
                                    <input
                                        type="password"
                                        required
                                        value={passwordForm.data.password}
                                        onChange={(e) => passwordForm.setData('password', e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                    />
                                    {passwordForm.errors.password && (
                                        <p className="text-xs text-rose-400 mt-1">{passwordForm.errors.password}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                                        Confirm New Password *
                                    </label>
                                    <input
                                        type="password"
                                        required
                                        value={passwordForm.data.password_confirmation}
                                        onChange={(e) => passwordForm.setData('password_confirmation', e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                    />
                                    {passwordForm.errors.password_confirmation && (
                                        <p className="text-xs text-rose-400 mt-1">{passwordForm.errors.password_confirmation}</p>
                                    )}
                                </div>
                            </form>
                        </div>

                        <div className="mt-8 pt-4 border-t border-slate-800/80 flex justify-end">
                            <button
                                type="submit"
                                form="password-form"
                                disabled={passwordForm.processing}
                                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-indigo-600/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
                            >
                                Change Password
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
