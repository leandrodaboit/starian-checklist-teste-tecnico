import { Observable } from 'rxjs';
import { Task } from '../../../domain/models/task.model';
import { TaskRepository } from '../../../domain/repositories/task.repository';
import {inject, Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class GetAllTasksUseCase {
  private readonly taskRepository = inject(TaskRepository);
  execute(): Observable<Task[]> {
    return this.taskRepository.getAll();
  }
}
