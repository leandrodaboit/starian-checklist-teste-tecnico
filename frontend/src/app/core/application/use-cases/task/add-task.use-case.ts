import {Observable} from 'rxjs';
import {Task, CreateTask} from '../../../domain/models/task.model';
import {TaskRepository} from '../../../domain/repositories/task.repository';
import {inject, Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class AddTaskUseCase {
  private readonly taskRepository = inject(TaskRepository);
  execute(task: CreateTask): Observable<Task> {
    return this.taskRepository.addTask(task);
  }
}
