<?php

namespace App\Http\Controllers\Task;

use App\Domain\Task\DTOs\CreateTaskData;
use App\Domain\Task\DTOs\UpdateTaskData;
use App\Domain\Task\Services\TaskService;
use App\Http\Controllers\Controller;
use App\Http\Requests\Task\StoreTaskRequest;
use App\Http\Requests\Task\UpdateTaskRequest;
use App\Http\Resources\Task\TaskResource;
use App\Support\Traits\ApiResponses;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\DB;

class TaskController extends Controller
{
    use ApiResponses;

    public function __construct(private readonly TaskService $taskService)
    {
    }

    public function index(): AnonymousResourceCollection
    {
        return TaskResource::collection($this->taskService->getTasks());
    }

    public function store(StoreTaskRequest $request): JsonResponse
    {
        $task = DB::transaction(function () use ($request) {
            return $this->taskService->create(CreateTaskData::from($request->validated()));
        });
        return $this->dataResponse(new TaskResource($task), 'Task successfully created.');
    }

    public function update(UpdateTaskRequest $request): JsonResponse
    {
        $task = DB::transaction(function () use ($request) {
            return $this->taskService->update(UpdateTaskData::from($request->validated()));
        });
        return $this->dataResponse(new TaskResource($task), 'Task successfully updated.');
    }

    public function destroy(int $taskId): JsonResponse
    {
        DB::transaction(function () use ($taskId) {
            $this->taskService->delete($taskId);
        });
        return $this->messageOnlyResponse('Task deleted successfully.');
    }
}
