import React from 'react';

export default function StatCard({ title, value, subtitle, icon: Icon, iconColor = 'text-sky-500 dark:text-sky-400', iconBg = 'bg-sky-500/10' }) {
    return (
        <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800/80 p-6 shadow-sm dark:shadow-xl transition-all duration-200 hover:border-slate-300 dark:hover:border-slate-700/80">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-[11px] font-bold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                        {title}
                    </p>
                    <h3 className="mt-3 text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        {value}
                    </h3>
                    <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
                        {subtitle}
                    </p>
                </div>
                {Icon && (
                    <div className={`p-3 rounded-xl border border-slate-200 dark:border-slate-700/50 ${iconBg} ${iconColor}`}>
                        <Icon className="w-5 h-5" />
                    </div>
                )}
            </div>
        </div>
    );
}
