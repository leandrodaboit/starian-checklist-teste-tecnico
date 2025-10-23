import {Component, EventEmitter, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputComponent } from '../../../../shared/components/input/input.component';
import {ButtonComponent} from "../../../../shared/components/button/button.component";

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule, InputComponent, ButtonComponent],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent {
  title: string;
  constructor() {
    this.title = '';
  }
  @Output() addTask = new EventEmitter<string>();
  onSubmit(): void {
    const title = this.title.trim();
    if (!title) return;
    this.addTask.emit(title);
    this.resetForm();
  }
  private resetForm(): void {
    this.title = '';
  }
}
