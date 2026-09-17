import React, { useState, useEffect } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import {
    LayoutDashboard,
    FileText,
    Building2,
    ShieldAlert,
    Users,
    FolderKanban,
    Settings,
    LogOut,
    Sun,
    Moon,
    Menu,
    X,
    ChevronRight,
    CheckCircle2,
    AlertCircle,
    Info,
    ExternalLink
} from 'lucide-react';

export default function AdminLayout({ children, title, breadcrumbs = [] }) {
    const { auth, flash, appName } = usePage().props;
    const user = auth?.user;

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        const checkDark = document.documentElement.classList.contains('dark');
        setIsDark(checkDark);
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

    const handleLogout = (e) => {
        e.preventDefault();
        router.post('/admin/logout');
    };

    const navItems = [
        {
            name: 'Dashboard',
            href: '/admin',
            active: window.location.pathname === '/admin' || window.location.pathname === '/admin/dashboard',
            icon: LayoutDashboard,
        },
        {
            name: 'Blog Posts',
            href: '/admin/posts',
            active: window.location.pathname.startsWith('/admin/posts'),
            icon: FileText,
        },
        {
            name: 'Companies',
            href: '/admin/companies',
            active: window.location.pathname.startsWith('/admin/companies'),
            icon: Building2,
        },
        {
            name: 'Supervisors',
            href: '/admin/supervisors',
            active: window.location.pathname.startsWith('/admin/supervisors'),
            icon: ShieldAlert,
        },
        {
            name: 'Users',
            href: '/admin/users',
            active: window.location.pathname.startsWith('/admin/users'),
            icon: Users,
        },
        {
            name: 'Categories',
            href: '/admin/categories',
            active: window.location.pathname.startsWith('/admin/categories'),
            icon: FolderKanban,
        },
        {
            name: 'Settings',
            href: '/admin/settings',
            active: window.location.pathname.startsWith('/admin/settings'),
            icon: Settings,
        },
    ];

    const getInitials = (name) => {
        if (!name) return 'A';
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .substring(0, 2);
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#070B14] text-slate-800 dark:text-slate-100 flex transition-colors duration-200 selection:bg-indigo-500 selection:text-white antialiased">
            {/* Mobile backdrop */}
            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity"
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-[#0B1120] border-r border-slate-200 dark:border-slate-800/80 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                {/* Brand / Logo */}
                <div>
                    <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200 dark:border-slate-800/80">
                        <Link href="/admin" className="flex items-center gap-3 group">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-rose-500 via-indigo-600 to-indigo-400 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 ring-1 ring-white/20">
                                <span className="font-black text-sm tracking-wider">TT</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-extrabold text-sm tracking-widest uppercase text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                    TTECH SUITES
                                </span>
                                <span className="text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400 tracking-wider">
                                    Admin Console
                                </span>
                            </div>
                        </Link>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="p-1 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white lg:hidden"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Navigation Items */}
                    <nav className="p-4 space-y-1.5 overflow-y-auto max-h-[calc(100vh-10rem)]">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setSidebarOpen(false)}
                                    className={`flex items-center gap-3.5 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 ${
                                        item.active
                                            ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-600/30'
                                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                                    }`}
                                >
                                    <Icon className={`w-4 h-4 ${item.active ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`} />
                                    <span>{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Bottom User Profile Section */}
                <div className="p-4 border-t border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-[#0B1120]">
                    <div className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm">
                        <Link href="/admin/settings" className="flex items-center gap-3 min-w-0">
                            <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center ring-2 ring-blue-500/30 shrink-0">
                                {getInitials(user?.name)}
                            </div>
                            <div className="truncate">
                                <p className="text-xs font-semibold text-slate-900 dark:text-white truncate leading-tight">
                                    {user?.name || 'Admin User'}
                                </p>
                                <p className="text-[11px] text-slate-500 dark:text-slate-400 capitalize">
                                    {user?.user_type || 'Admin'}
                                </p>
                            </div>
                        </Link>
                        <button
                            onClick={handleLogout}
                            title="Sign out"
                            className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
                {/* Topbar Header */}
                <header className="sticky top-0 z-30 h-16 bg-white/80 dark:bg-[#0B1120]/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/80 flex items-center justify-between px-4 lg:px-8">
                    {/* Left: Mobile Menu Toggle & Breadcrumbs */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                        <div className="flex items-center gap-2 text-sm font-medium">
                            <Link href="/admin" className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors">
                                Admin
                            </Link>
                            <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600" />
                            <span className="text-slate-900 dark:text-slate-100 font-semibold">{title || 'Dashboard'}</span>
                        </div>
                    </div>

                    {/* Right: Theme Toggle, Quick Actions & Profile Dropdown */}
                    <div className="flex items-center gap-3">
                        {/* Theme Toggle Button */}
                        <button
                            onClick={toggleTheme}
                            aria-label="Toggle theme"
                            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-600 shadow-sm transition-colors cursor-pointer"
                        >
                            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
                        </button>

                        {/* User Menu Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setUserMenuOpen(!userMenuOpen)}
                                className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-900/60 hover:bg-slate-50 dark:hover:bg-slate-800 shadow-sm transition-all text-sm cursor-pointer"
                            >
                                <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                                    {getInitials(user?.name)}
                                </div>
                                <span className="hidden sm:inline font-semibold text-slate-800 dark:text-slate-200">
                                    {user?.name || 'Admin User'}
                                </span>
                            </button>

                            {userMenuOpen && (
                                <>
                                    <div
                                        onClick={() => setUserMenuOpen(false)}
                                        className="fixed inset-0 z-30"
                                    />
                                    <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-2xl p-1.5 z-40 animate-in fade-in slide-in-from-top-2">
                                        <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                                            <p className="text-xs font-semibold text-slate-900 dark:text-slate-200">{user?.name}</p>
                                            <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{user?.email}</p>
                                        </div>
                                        <Link
                                            href="/admin/settings"
                                            onClick={() => setUserMenuOpen(false)}
                                            className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80 rounded-xl transition-colors"
                                        >
                                            <Settings className="w-4 h-4 text-slate-400" />
                                            <span>Profile Settings</span>
                                        </Link>
                                        <Link
                                            href="/"
                                            target="_blank"
                                            onClick={() => setUserMenuOpen(false)}
                                            className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80 rounded-xl transition-colors"
                                        >
                                            <ExternalLink className="w-4 h-4 text-slate-400" />
                                            <span>Public Portal</span>
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-xl transition-colors text-left cursor-pointer"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            <span>Sign Out</span>
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                {/* Flash Messages */}
                {flash?.success && (
                    <div className="mx-4 lg:mx-8 mt-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm flex items-center gap-3 animate-in fade-in">
                        <CheckCircle2 className="w-5 h-5 shrink-0" />
                        <span>{flash.success}</span>
                    </div>
                )}
                {flash?.error && (
                    <div className="mx-4 lg:mx-8 mt-4 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-sm flex items-center gap-3 animate-in fade-in">
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        <span>{flash.error}</span>
                    </div>
                )}
                {flash?.info && (
                    <div className="mx-4 lg:mx-8 mt-4 p-4 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 text-sm flex items-center gap-3 animate-in fade-in">
                        <Info className="w-5 h-5 shrink-0" />
                        <span>{flash.info}</span>
                    </div>
                )}

                {/* Page Content */}
                <main className="flex-1 p-4 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
