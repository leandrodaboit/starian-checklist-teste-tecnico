<?php

namespace Tests\Unit\Domain\Task\Services;

use App\Domain\Task\DTOs\CreateTaskData;
use App\Domain\Task\DTOs\UpdateTaskData;
use App\Domain\Task\Services\TaskService;
use App\Models\Task;
use App\Repositories\Task\TaskRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Mockery;
use Mockery\MockInterface;
use PHPUnit\Framework\Attributes\Test;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Tests\TestCase;

class TaskServiceTest extends TestCase
{
    use RefreshDatabase;
    /**
     * @var TaskRepository|MockInterface
     */
    protected MockInterface $taskRepositoryMock;
    protected TaskService $taskService;

    protected function setUp(): void
    {
        parent::setUp();
        $this->taskRepositoryMock = $this->mock(TaskRepository::class);
        $this->taskService = new TaskService($this->taskRepositoryMock);
    }

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }

    #[Test]
    public function it_can_get_tasks(): void
    {
        $expectedTasks = new Collection([
            Task::factory()->make(['id' => 1]),
            Task::factory()->make(['id' => 2]),
        ]);
        $this->taskRepositoryMock
            ->shouldReceive('getTasks')
            ->once()
            ->andReturn($expectedTasks);
        $result = $this->taskService->getTasks();

        $this->assertSame($expectedTasks, $result);
        $this->assertCount(2, $result);
    }

    #[Test]
    public function it_can_create_a_task(): void
    {
        $dto = CreateTaskData::from([
            'title' => 'New Test Task',
            'completed' => false,
        ]);
        $createdTask = Task::factory()->create(['id' => 1, 'title' => 'New Test Task']);

        $this->taskRepositoryMock
            ->shouldReceive('create')
            ->once()
            ->with($dto)
            ->andReturn($createdTask);
        $result = $this->taskService->create($dto);

        $this->assertSame($createdTask, $result);
        $this->assertEquals(1, $result->id);
    }

    #[Test]
    public function it_can_update_a_task(): void
    {
        $dto = UpdateTaskData::from([
            'id' => 1,
            'title' => 'Updated Title',
            'completed' => true,
        ]);
        $updatedTask = Task::factory()->create(['id' => 1, 'title' => 'Updated Title', 'completed' => true]);

        $this->taskRepositoryMock
            ->shouldReceive('update')
            ->once()
            ->with($dto)
            ->andReturn($updatedTask);
        $result = $this->taskService->update($dto);

        $this->assertSame($updatedTask, $result);
        $this->assertEquals('Updated Title', $result->title);
        $this->assertTrue($result->completed);
    }

    #[Test]
    public function it_can_delete_a_task_successfully(): void
    {
        $taskId = 1;

        $this->taskRepositoryMock
            ->shouldReceive('delete')
            ->once()
            ->with($taskId)
            ->andReturn(true);

        $this->taskService->delete($taskId);

        $this->assertTrue(true);
    }

    #[Test]
    public function it_throws_an_exception_if_delete_fails(): void
    {
        $taskId = 999;

        $this->taskRepositoryMock
            ->shouldReceive('delete')
            ->once()
            ->with($taskId)
            ->andReturn(false);

        $this->expectException(NotFoundHttpException::class);
        $this->expectExceptionMessage('Task not found or could not be deleted.');

        $this->taskService->delete($taskId);
    }
}
