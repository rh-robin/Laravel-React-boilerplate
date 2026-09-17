import React, { useState, useEffect } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { ShieldCheck, ArrowRight, Sun, Moon, Sparkles, Layers, Cpu, Lock, CheckCircle } from 'lucide-react';

export default function Welcome() {
    const { auth, appName } = usePage().props;
    const user = auth?.user;
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        setIsDark(document.documentElement.classList.contains('dark'));
    }, []);

    const toggleTheme = () => {
        const willBeDark = !isDark;
        setIsDark(willBeDark);
        if (willBeDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#070B14] text-slate-800 dark:text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white relative overflow-hidden transition-colors duration-200">
            <Head title="System Portal — Control Center" />

            {/* Background glowing gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-indigo-500/10 dark:from-indigo-500/15 via-purple-500/5 dark:via-purple-500/10 to-transparent blur-3xl pointer-events-none" />
            <div className="absolute -bottom-40 right-10 w-[500px] h-[500px] bg-blue-600/5 dark:bg-blue-600/10 blur-3xl pointer-events-none" />

            {/* Header */}
            <header className="relative z-10 max-w-7xl mx-auto w-full px-6 py-6 flex items-center justify-between border-b border-slate-200 dark:border-slate-800/60">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 via-indigo-600 to-indigo-400 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 ring-1 ring-white/20">
                        <span className="font-black text-base tracking-wider">TT</span>
                    </div>
                    <div>
                        <span className="font-extrabold text-base tracking-widest uppercase text-slate-900 dark:text-white block">
                            TTECH SUITES
                        </span>
                        <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block">
                            Enterprise Portal Architecture
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleTheme}
                        aria-label="Toggle theme"
                        className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white shadow-sm transition-colors cursor-pointer"
                    >
                        {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
                    </button>

                    <Link
                        href={user ? '/admin' : '/admin/login'}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs tracking-wide uppercase bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-600/30 hover:from-indigo-500 hover:to-indigo-600 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                    >
                        <span>{user ? 'Open Dashboard' : 'Sign In'}</span>
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </header>

            {/* Hero Section */}
            <main className="relative z-10 max-w-4xl mx-auto px-6 py-16 sm:py-24 text-center my-auto">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-8">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Universal Ready-Made Boilerplate</span>
                </div>

                <h1 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                    Full-Stack Application &amp; <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-indigo-500 to-teal-500 dark:from-indigo-400 dark:via-sky-300 dark:to-teal-200">
                        Administrative Console
                    </span>
                </h1>

                <p className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                    A robust, modular system architecture engineered with Laravel, React, and Inertia.js.
                    Equipped with deep dark-mode UI, role authorization, content management, and extensible endpoints.
                </p>

                {/* Main Action Button */}
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href={user ? '/admin' : '/admin/login'}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold text-sm tracking-wider uppercase bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-xl shadow-indigo-600/35 hover:from-indigo-500 hover:to-indigo-600 transition-all transform hover:-translate-y-1 active:translate-y-0 cursor-pointer"
                    >
                        <ShieldCheck className="w-5 h-5" />
                        <span>Login to Admin Dashboard</span>
                        <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                </div>

                {/* Highlights Grid */}
                <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
                    <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 shadow-sm dark:shadow-none backdrop-blur-md">
                        <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 w-fit mb-4">
                            <Layers className="w-5 h-5" />
                        </div>
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm">Modular Separation</h4>
                        <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                            Isolated <code className="text-indigo-600 dark:text-indigo-300">routes/admin.php</code> and controllers in a dedicated admin directory.
                        </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 shadow-sm dark:shadow-none backdrop-blur-md">
                        <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 w-fit mb-4">
                            <Lock className="w-5 h-5" />
                        </div>
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm">Strict Access Control</h4>
                        <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                            Built-in user type verification, soft delete recovery trash, and secure session management.
                        </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 shadow-sm dark:shadow-none backdrop-blur-md">
                        <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 w-fit mb-4">
                            <Cpu className="w-5 h-5" />
                        </div>
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm">React Inertia Speed</h4>
                        <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                            Zero-delay client transitions with classic backend routing convenience and full reactivity.
                        </p>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="relative z-10 max-w-7xl mx-auto w-full px-6 py-6 border-t border-slate-200 dark:border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>System Operational • Ready-Made Boilerplate</span>
                </div>
                <div>
                    <span>&copy; {new Date().getFullYear()} All rights reserved.</span>
                </div>
            </footer>
        </div>
    );
}
