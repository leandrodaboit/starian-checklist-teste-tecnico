<?php

use App\Http\Controllers\Task\TaskController;
use Illuminate\Support\Facades\Route;

Route::middleware(['token'])->group(function () {
    Route::apiResource('tasks', TaskController::class)
        ->only(['index', 'store', 'update','destroy'])
        ->parameters(['tasks' => 'taskId'])
        ->whereNumber('taskId');
});
