import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../../../core/domain/models/task.model';
import {ButtonComponent} from "../../../../shared/components/button/button.component";

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskItemComponent {
  @Input({ required: true }) task!: Task;
  @Output() remove = new EventEmitter<number>();
  @Output() update = new EventEmitter<{ id: number; completed: boolean; title: string }>();

  onRemove(): void {
    this.remove.emit(this.task.id);
  }

  onUpdate(): void {
    this.update.emit({
      id: this.task.id,
      completed: !this.task.completed,
      title: this.task.title
    });
  }
}
