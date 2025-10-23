<?php

namespace App\Domain\Task\Services;

use App\Domain\Task\DTOs\CreateTaskData;
use App\Domain\Task\DTOs\UpdateTaskData;
use App\Models\Task;
use App\Repositories\Task\TaskRepository;
use App\Support\Traits\EnsuresPersistence;
use Illuminate\Database\Eloquent\Collection;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class TaskService
{
    use EnsuresPersistence;

    public function __construct(private readonly TaskRepository $taskRepository)
    {
    }

    public function getTasks(): Collection
    {
        return $this->taskRepository->getTasks();
    }

    public function create(CreateTaskData $createTaskData): Task
    {
        return $this->ensurePersisted(
            $this->taskRepository->create($createTaskData),
            'Failed to create task.'
        );
    }

    public function update(UpdateTaskData $data): Task
    {
        return $this->ensurePersisted(
            $this->taskRepository->update($data),
            'Failed to update task.'
        );
    }

    public function delete(int $taskId): void
    {
        if (! $this->taskRepository->delete($taskId)) {
            throw new NotFoundHttpException('Task not found or could not be deleted.');
        }
    }

}
