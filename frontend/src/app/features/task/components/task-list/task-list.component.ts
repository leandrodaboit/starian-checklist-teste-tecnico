import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../../../core/domain/models/task.model';
import { TaskItemComponent } from '../task-item/task-item.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskItemComponent],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent {
  @Input() tasks: Task[] | null = null;
  @Output() updateTask = new EventEmitter<{ id: number; completed: boolean; title: string }>();
  @Output() removeTask = new EventEmitter<number>();

  onUpdateTask(task: { id: number; completed: boolean; title: string }): void {
    this.updateTask.emit(task);
  }

  onRemoveTask(id: number): void {
    this.removeTask.emit(id);
  }
}
