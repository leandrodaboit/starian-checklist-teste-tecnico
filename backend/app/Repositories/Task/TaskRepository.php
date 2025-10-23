<?php

namespace App\Repositories\Task;

use App\Domain\Task\DTOs\CreateTaskData;
use App\Domain\Task\DTOs\UpdateTaskData;
use App\Models\Task;
use Illuminate\Database\Eloquent\Collection;

class TaskRepository
{
    public function __construct(private readonly Task $task)
    {
    }

    public function getTasks(): Collection
    {
        return $this->task->newQuery()
            ->select(['id', 'title', 'completed', 'created_at'])
            ->incompleteFirst()
            ->get();
    }

    public function create(CreateTaskData $createTaskData): Task
    {
        return $this->task->newQuery()->create($createTaskData->toArray());
    }

    public function update(UpdateTaskData $createTaskData): Task
    {
        $task = $this->task->findOrFail($createTaskData->id);
        $task->update($createTaskData->toArray());
        return $task->refresh();
    }

    public function delete(int $taskId): bool
    {
        return $this->task->find($taskId)->delete();
    }
}
