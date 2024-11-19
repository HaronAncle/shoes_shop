{{-- <!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html> --}}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title inertia>{{ config('app.name', 'Джоватти') }}</title>
    <script src="{{ asset('js/bootstrap.bundle.min.js') }}" defer></script>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <script>
        window.csrfToken = "{{ csrf_token() }}";
    </script>
    {{-- <link rel="stylesheet" href="../../node_modules/bootstrap/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="@fortawesome/fontawesome-free/css/all.min.css">

    <link rel="stylesheet" href="../css/styleNull.css">
    <link rel="stylesheet" href="../css/styleRoot.css">
    <link rel="stylesheet" href="../css/styleGlobal.css"> --}}
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
    @inertiaHead
</head>
<body>
    @inertia
    {{-- <div id="root"></div> --}}
</body>
</html>