import React from 'react';
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children, maxWidth = 'max-w-xl' }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto px-4 py-6 sm:px-0 flex items-center justify-center">
            {/* Backdrop */}
            <div
                onClick={onClose}
                className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            />

            {/* Modal Dialog */}
            <div
                className={`relative w-full ${maxWidth} rounded-2xl bg-[#0F172A] border border-slate-800 shadow-2xl p-6 text-left transform transition-all z-10`}
            >
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                    <h3 className="text-lg font-bold text-white">{title}</h3>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg p-1 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="mt-4">{children}</div>
            </div>
        </div>
    );
}
