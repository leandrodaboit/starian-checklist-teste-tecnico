<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use App\Http\Middleware\TokenMiddleware;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->prependToGroup('api', TokenMiddleware::class);
        $middleware->alias([
            'token' => TokenMiddleware::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->renderable(fn(ModelNotFoundException $e, $r) =>
        $r->is('api/*') ? response()->json(['error' => 'Resource not found'], 404) : null
        );

        $exceptions->renderable(fn(AuthenticationException $e, $r) =>
        $r->is('api/*') ? response()->json(['error' => 'Not authenticated'], 401) : null
        );

        $exceptions->renderable(fn(AuthorizationException $e, $r) =>
        $r->is('api/*') ? response()->json(['error' => 'Unauthorized action'], 403) : null
        );

        $exceptions->renderable(function (HttpExceptionInterface $e, $r) {
            if ($r->is('api/*')) {
                return response()->json([
                    'error' => $e->getMessage() ?: 'Error HTTP'
                ], $e->getStatusCode());
            }
        });

        $exceptions->renderable(function (Throwable $e, $r) {
            if ($r->is('api/*')) {
                return response()->json([
                    'error' => config('app.debug')
                        ? $e->getMessage()
                        : 'Internal server error'
                ], 500);
            }
        });
    })->create();
