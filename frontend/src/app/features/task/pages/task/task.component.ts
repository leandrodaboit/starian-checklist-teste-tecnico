import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { Task } from '../../../../core/domain/models/task.model';
import { TaskService } from '../../../../core/application/services/task.service';
import { TaskFormComponent } from '../../components/task-form/task-form.component';
import { TaskListComponent } from '../../components/task-list/task-list.component';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, TaskFormComponent, TaskListComponent],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent implements OnInit {
  private readonly taskService = inject(TaskService);
  private readonly destroyRef = inject(DestroyRef);

  tasks$: Observable<Task[]> = this.taskService.tasks$;

  ngOnInit(): void {
    this.taskService.loadTasks()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({ error: (error: unknown) => console.error('Error loading tasks:', error) });
  }

  onAddTask(title: string): void {
    const payload = { completed: false, title: title }
    this.taskService.addTask(payload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({ error: (error: unknown) => console.error('Error add task:', error) });
  }
  onUpdateTask(task: { id: number; completed: boolean; title: string }): void {
    const payload = { id: task.id, completed: !task.completed, title: task.title }
    this.taskService.updateTask(payload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({ error: (error: unknown) => console.error('Error update task:', error) });
  }

  onRemoveTask(id: number): void {
    this.taskService.removeTask(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({ error: (error: unknown) => console.error('Error remove task:', error) });
  }
}
