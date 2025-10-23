<?php

namespace Tests\Feature;

use App\Domain\Task\DTOs\CreateTaskData;
use App\Domain\Task\DTOs\UpdateTaskData;
use App\Domain\Task\Services\TaskService;
use App\Models\Task;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Mockery\MockInterface;
use Tests\TestCase;
use PHPUnit\Framework\Attributes\Test;

class TaskApiTest extends TestCase
{
    use RefreshDatabase;

    protected MockInterface $taskServiceMock;

    protected function setUp(): void
    {
        parent::setUp();
        $this->taskServiceMock = $this->mock(TaskService::class);
        $this->withToken('fixedtokenfordemo');
    }

    #[Test]
    public function it_can_list_tasks(): void
    {
        $tasks = Task::factory()->count(4)->create();

        $this->taskServiceMock
            ->shouldReceive('getTasks')
            ->once()
            ->andReturn($tasks);

        $response = $this->getJson(route('tasks.index'));

        $response->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    '*' => ['id', 'title', 'completed', 'created_at']
                ]
            ])
            ->assertJsonCount(4, 'data');
    }

    #[Test]
    public function it_can_create_a_task(): void
    {
        $dataToCreate = [
            'title' => 'New Task',
            'completed' => false,
        ];

        $createdTask = Task::factory()->create($dataToCreate);

        $this->taskServiceMock
            ->shouldReceive('create')
            ->once()
            ->withArgs(function (CreateTaskData $data) use ($dataToCreate) {
                return $data->title === $dataToCreate['title'] &&
                    $data->completed === $dataToCreate['completed'];
            })
            ->andReturn($createdTask);

        $response = $this->postJson(route('tasks.store'), $dataToCreate);
        $response->assertStatus(200)
            ->assertJson([
                'message' => 'Task successfully created.',
                'data' => [
                    'id' => $createdTask->id,
                    'title' => $createdTask->title,
                    'completed' => (bool) $createdTask->completed,
                ]
            ]);
    }

    #[Test]
    public function it_can_update_a_task(): void
    {
        $existingTask = Task::factory()->create();
        $dataToUpdate = [
            'id' => $existingTask->id,
            'title' => 'Updated Task Title',
            'completed' => true,
        ];
        $existingTask->title = $dataToUpdate['title'];
        $existingTask->completed = $dataToUpdate['completed'];

        $this->taskServiceMock
            ->shouldReceive('update')
            ->once()
            ->withArgs(function (UpdateTaskData $data) use ($dataToUpdate) {
                return $data->id === $dataToUpdate['id'] &&
                    $data->title === $dataToUpdate['title'] &&
                    $data->completed === $dataToUpdate['completed'];
            })
            ->andReturn($existingTask);

        $response = $this->putJson(route('tasks.update', ['taskId' => $existingTask->id]), $dataToUpdate);
        $response->assertStatus(200)
            ->assertJson([
                'message' => 'Task successfully updated.',
                'data' => [
                    'id' => $existingTask->id,
                    'title' => 'Updated Task Title',
                    'completed' => true,
                ]
            ]);
    }

    #[Test]
    public function it_can_delete_a_task(): void
    {
        $task = Task::factory()->create();

        $this->taskServiceMock
            ->shouldReceive('delete')
            ->once()
            ->with($task->id);

        $response = $this->deleteJson(route('tasks.destroy', ['taskId' => $task->id]));
        $response->assertStatus(200)
            ->assertJson([
                'message' => 'Task deleted successfully.'
            ]);
    }

    #[Test]
    public function it_fails_to_delete_a_task_with_non_numeric_id(): void
    {
        $invalidTaskId = 'abc';
        $response = $this->delete(route('tasks.destroy', ['taskId' => $invalidTaskId]));
        $response->assertStatus(404);
    }
}
