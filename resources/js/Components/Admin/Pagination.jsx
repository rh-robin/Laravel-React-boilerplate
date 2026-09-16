import React from 'react';
import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ links, from, to, total }) {
    if (!links || links.length <= 3) return null;

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-6 border-t border-slate-800/80 text-xs text-slate-400">
            <div>
                Showing <span className="font-semibold text-slate-200">{from || 0}</span> to{' '}
                <span className="font-semibold text-slate-200">{to || 0}</span> of{' '}
                <span className="font-semibold text-slate-200">{total}</span> total entries
            </div>

            <div className="flex items-center gap-1">
                {links.map((link, key) => {
                    if (link.label.includes('Previous')) {
                        return link.url ? (
                            <Link
                                key={key}
                                href={link.url}
                                className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-800 hover:bg-slate-800 hover:text-white transition-colors"
                            >
                                <ChevronLeft className="w-3.5 h-3.5" />
                                <span>Prev</span>
                            </Link>
                        ) : (
                            <span
                                key={key}
                                className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-900 opacity-40 cursor-not-allowed"
                            >
                                <ChevronLeft className="w-3.5 h-3.5" />
                                <span>Prev</span>
                            </span>
                        );
                    }

                    if (link.label.includes('Next')) {
                        return link.url ? (
                            <Link
                                key={key}
                                href={link.url}
                                className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-800 hover:bg-slate-800 hover:text-white transition-colors"
                            >
                                <span>Next</span>
                                <ChevronRight className="w-3.5 h-3.5" />
                            </Link>
                        ) : (
                            <span
                                key={key}
                                className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-900 opacity-40 cursor-not-allowed"
                            >
                                <span>Next</span>
                                <ChevronRight className="w-3.5 h-3.5" />
                            </span>
                        );
                    }

                    return link.url ? (
                        <Link
                            key={key}
                            href={link.url}
                            className={`min-w-[32px] h-8 flex items-center justify-center rounded-lg font-semibold transition-colors ${
                                link.active
                                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                                    : 'border border-slate-800 hover:bg-slate-800 hover:text-white'
                            }`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ) : (
                        <span
                            key={key}
                            className="min-w-[32px] h-8 flex items-center justify-center rounded-lg border border-slate-900 opacity-40 cursor-not-allowed"
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    );
                })}
            </div>
        </div>
    );
}
