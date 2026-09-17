import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Building2, Plus, Globe, Users, Briefcase } from 'lucide-react';

export default function Index() {
    const demoCompanies = [
        { id: 1, name: 'TTech Innovations Ltd', domain: 'ttech.io', industry: 'Enterprise Software', employees: 140, status: 'Active' },
        { id: 2, name: 'CloudScale Systems', domain: 'cloudscale.net', industry: 'Cloud & Infrastructure', employees: 85, status: 'Active' },
        { id: 3, name: 'Apex AI Labs', domain: 'apexailabs.com', industry: 'Generative AI', employees: 32, status: 'Active' },
    ];

    return (
        <AdminLayout title="Companies">
            <Head title="Companies — TTECH SUITES" />

            <div className="space-y-6">
                <div className="rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800/80 p-6 shadow-sm dark:shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                        <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                            <Building2 className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                                Company Directory
                            </h2>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                Enterprise client organizations, workspaces, and tenant affiliations
                            </p>
                        </div>
                    </div>

                    <button
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs tracking-wide bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Add Organization</span>
                    </button>
                </div>

                <div className="rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800/80 shadow-sm dark:shadow-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-200 dark:border-slate-800/60 bg-slate-50/75 dark:bg-slate-900/40 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                    <th className="py-3.5 px-6">ORGANIZATION</th>
                                    <th className="py-3.5 px-6">DOMAIN</th>
                                    <th className="py-3.5 px-6">INDUSTRY</th>
                                    <th className="py-3.5 px-6">TEAM SIZE</th>
                                    <th className="py-3.5 px-6">STATUS</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/40 text-xs">
                                {demoCompanies.map((c) => (
                                    <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                        <td className="py-4 px-6 font-semibold text-slate-800 dark:text-slate-200">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 font-bold flex items-center justify-center">
                                                    {c.name[0]}
                                                </div>
                                                <span>{c.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 font-mono text-slate-600 dark:text-slate-400">
                                            {c.domain}
                                        </td>
                                        <td className="py-4 px-6 text-slate-700 dark:text-slate-300">
                                            {c.industry}
                                        </td>
                                        <td className="py-4 px-6 text-slate-700 dark:text-slate-300">
                                            {c.employees} members
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                                                {c.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
