<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Validation\ValidationException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        //
    })
    ->withExceptions(function (Exceptions $exceptions) {
        // Manejar ValidationException
        $exceptions->renderable(function (ValidationException $e, $request) {
            if ($request->expectsJson()) {
                // Obtener los errores desde el validador
                $errors = $e->validator->errors()->getMessages(); // Método correcto para obtener errores
                return response()->json([
                    'message' => reset($errors) ?: 'Validation failed', // Primer error o mensaje genérico
                    'errors' => $errors, // Todos los errores
                ], $e->status); // Código HTTP 422 por defectp para errores de validación
            }
            // Si no es JSON, Laravel manejará la excepción por defecto
        });
    })->create();
