import React from 'react';

export function RoleBadge({ role }) {
    if (role === 'admin') {
        return (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Admin
            </span>
        );
    }
    if (role === 'supervisor') {
        return (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                Supervisor
            </span>
        );
    }
    return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
            User
        </span>
    );
}

export function StatusBadge({ status, isVerified }) {
    if (status === 'published' || isVerified) {
        return (
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {isVerified ? 'Verified' : 'Published'}
            </span>
        );
    }
    if (status === 'draft') {
        return (
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                Draft
            </span>
        );
    }
    return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-slate-800 text-slate-400 border border-slate-700">
            Pending
        </span>
    );
}
