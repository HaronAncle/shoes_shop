<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class CheckAuth
{
    public function handle($request, Closure $next)
    {
        if (!Auth::check()) {
            return response()->json(null);
        }

        return $next($request);
    }
}
