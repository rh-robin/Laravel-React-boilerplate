<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="h-full dark">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title inertia>{{ config('app.name', 'Admin Dashboard') }}</title>

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700|inter:400,500,600,700&display=swap" rel="stylesheet" />

        <script>
            // Synchronously apply theme before paint to prevent flicker
            (function () {
                const savedTheme = localStorage.getItem('theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (savedTheme === 'light') {
                    document.documentElement.classList.remove('dark');
                } else if (savedTheme === 'dark' || prefersDark || !savedTheme) {
                    document.documentElement.classList.add('dark');
                }
            })();
        </script>

        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.jsx'])
        @inertiaHead
    </head>
    <body class="h-full bg-slate-50 text-slate-900 dark:bg-[#070B14] dark:text-slate-100 antialiased font-sans selection:bg-indigo-500 selection:text-white">
        @inertia
    </body>
</html>
