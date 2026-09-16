import React, { useState, useEffect } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, Sun, Moon, ArrowLeft, KeyRound } from 'lucide-react';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [isDark, setIsDark] = useState(true);

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        setIsDark(document.documentElement.classList.contains('dark'));
        return () => {
            reset('password');
        };
    }, []);

    const toggleTheme = () => {
        if (isDark) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            setIsDark(false);
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            setIsDark(true);
        }
    };

    const fillAdminCredentials = () => {
        setData({
            email: 'admin@admin.com',
            password: 'password',
            remember: true,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/login');
    };

    return (
        <div className="min-h-screen bg-[#070B14] text-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-200 selection:bg-indigo-500 selection:text-white">
            <Head title="Admin Login — TTECH SUITES" />

            {/* Glowing background elements */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header with Navigation & Theme Toggle */}
            <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10 max-w-5xl mx-auto">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Return to Portal</span>
                </Link>

                <button
                    onClick={toggleTheme}
                    aria-label="Toggle theme"
                    className="p-2.5 rounded-xl border border-slate-700/60 bg-slate-900/60 text-slate-300 hover:text-white transition-colors"
                >
                    {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-300" />}
                </button>
            </div>

            {/* Main Login Card */}
            <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
                {/* Brand Logo */}
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-500 via-indigo-600 to-indigo-400 shadow-xl shadow-indigo-600/30 ring-1 ring-white/20 mb-4">
                        <span className="font-black text-xl text-white tracking-wider">TT</span>
                    </div>
                    <h2 className="text-2xl font-black text-white tracking-wider uppercase">
                        TTECH SUITES
                    </h2>
                    <p className="mt-1 text-xs font-semibold text-slate-400 uppercase tracking-widest">
                        Administrative Console Access
                    </p>
                </div>

                {/* Form Container */}
                <div className="mt-8 bg-[#0F172A] border border-slate-800/90 shadow-2xl rounded-3xl p-8 sm:p-10 backdrop-blur-xl">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email Input */}
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="admin@admin.com"
                                    className={`w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/80 border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                                        errors.email
                                            ? 'border-rose-500/80 focus:ring-rose-500/40'
                                            : 'border-slate-700/70 focus:border-indigo-500 focus:ring-indigo-500/20'
                                    }`}
                                />
                            </div>
                            {errors.email && (
                                <p className="mt-1.5 text-xs text-rose-400 font-medium">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Password Input */}
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                                    <Lock className="w-4 h-4" />
                                </div>
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="••••••••"
                                    className={`w-full pl-10 pr-11 py-3 rounded-xl bg-slate-900/80 border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                                        errors.password
                                            ? 'border-rose-500/80 focus:ring-rose-500/40'
                                            : 'border-slate-700/70 focus:border-indigo-500 focus:ring-indigo-500/20'
                                    }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-1.5 text-xs text-rose-400 font-medium">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Remember Me */}
                        <div className="flex items-center justify-between pt-1">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-slate-900"
                                />
                                <span className="text-xs text-slate-400 font-medium">
                                    Remember my session
                                </span>
                            </label>

                            <span className="text-xs text-indigo-400 hover:underline cursor-pointer">
                                Forgot password?
                            </span>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full py-3.5 px-4 rounded-xl font-bold text-sm tracking-wider uppercase bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white shadow-lg shadow-indigo-600/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
                        >
                            {processing ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <ShieldCheck className="w-4 h-4" />
                                    <span>Sign in to Dashboard</span>
                                </>
                            )}
                        </button>
                    </form>

                    {/* Quick Seeded Admin Credentials Helper */}
                    <div className="mt-6 pt-6 border-t border-slate-800">
                        <button
                            type="button"
                            onClick={fillAdminCredentials}
                            className="w-full py-2.5 px-3 rounded-xl border border-indigo-500/20 bg-indigo-500/5 hover:bg-indigo-500/10 text-indigo-400 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
                        >
                            <KeyRound className="w-3.5 h-3.5" />
                            <span>Auto-fill Demo Admin Credentials</span>
                        </button>
                    </div>
                </div>

                {/* Footer security note */}
                <p className="mt-6 text-center text-xs text-slate-500">
                    Protected by Enterprise Session Authorization &amp; CSRF Security
                </p>
            </div>
        </div>
    );
}
