import { Observable } from 'rxjs';
import { TaskRepository } from '../../../domain/repositories/task.repository';
import {inject, Injectable} from "@angular/core";
@Injectable({providedIn: 'root'})
export class DeleteTaskUseCase {
  private readonly taskRepository = inject(TaskRepository);
  execute(id: number): Observable<void> {
    return this.taskRepository.deleteTask(id);
  }
}
