import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { ShieldAlert, Plus, ShieldCheck } from 'lucide-react';
import { RoleBadge } from '@/Components/Admin/Badge';

export default function Index({ supervisors }) {
    const getInitials = (name) => {
        if (!name) return 'S';
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .substring(0, 2);
    };

    return (
        <AdminLayout title="Supervisors">
            <Head title="Supervisors — TTECH SUITES" />

            <div className="space-y-6">
                <div className="rounded-2xl bg-[#0F172A] border border-slate-800/80 p-6 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                        <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400">
                            <ShieldAlert className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white tracking-tight">
                                Supervisors &amp; System Administrators
                            </h2>
                            <p className="text-xs text-slate-400 mt-0.5">
                                High-privilege team members with console administrative access
                            </p>
                        </div>
                    </div>

                    <Link
                        href="/admin/users"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs tracking-wide bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white shadow-lg shadow-indigo-600/30 transition-all"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Manage In Users</span>
                    </Link>
                </div>

                <div className="rounded-2xl bg-[#0F172A] border border-slate-800/80 shadow-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-800/60 bg-slate-900/40 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                                    <th className="py-3.5 px-6">SUPERVISOR</th>
                                    <th className="py-3.5 px-6">USERNAME</th>
                                    <th className="py-3.5 px-6">EMAIL</th>
                                    <th className="py-3.5 px-6">PRIVILEGE LEVEL</th>
                                    <th className="py-3.5 px-6">STATUS</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/40 text-xs">
                                {supervisors && supervisors.length > 0 ? (
                                    supervisors.map((s) => (
                                        <tr key={s.id} className="hover:bg-slate-800/30 transition-colors">
                                            <td className="py-4 px-6 font-semibold text-slate-200">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center ring-2 ring-indigo-500/20">
                                                        {getInitials(s.name)}
                                                    </div>
                                                    <div>
                                                        <div>{s.name}</div>
                                                        <div className="text-[10px] text-slate-500 font-mono">ID: #{s.id}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 font-mono text-slate-400">
                                                {s.username}
                                            </td>
                                            <td className="py-4 px-6 text-slate-300">
                                                {s.email}
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                                                    <ShieldCheck className="w-3 h-3" />
                                                    <span>Admin Privilege</span>
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                                    {s.is_active ? 'Active' : 'Inactive'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="py-12 text-center text-slate-500">
                                            No supervisors found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
