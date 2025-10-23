import { Observable } from 'rxjs';
import { Task, UpdateTask } from '../../../domain/models/task.model';
import { TaskRepository } from '../../../domain/repositories/task.repository';
import {inject, Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class UpdateTaskUseCase {
  private readonly taskRepository = inject(TaskRepository);
  execute(task: UpdateTask): Observable<Task> {
    return this.taskRepository.updateTask(task);
  }
}
