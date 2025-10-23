import {inject, Injectable} from '@angular/core';
import { BehaviorSubject, Observable, finalize, tap } from 'rxjs';
import { Task, CreateTask, UpdateTask } from '../../domain/models/task.model';
import { GetAllTasksUseCase } from '../use-cases/task/get-all-tasks.use-case';
import { AddTaskUseCase } from '../use-cases/task/add-task.use-case';
import { UpdateTaskUseCase } from '../use-cases/task/update-task.use-case';
import { DeleteTaskUseCase } from '../use-cases/task/delete-task.use-case';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly _tasks$ = new BehaviorSubject<Task[]>([]);
  readonly tasks$ = this._tasks$.asObservable();

  private getAllTasksUseCase = inject(GetAllTasksUseCase);
  private addTaskUseCase = inject(AddTaskUseCase);
  private updateTaskUseCase = inject(UpdateTaskUseCase);
  private deleteTaskUseCase = inject(DeleteTaskUseCase);

  loadTasks(): Observable<Task[]> {
    return this.getAllTasksUseCase.execute().pipe(
      tap(tasks => this._tasks$.next(tasks)),
      finalize(() => console.log('Tasks loaded'))
    );
  }

  addTask(payload: CreateTask): Observable<Task> {
    return this.addTaskUseCase.execute(payload).pipe(
      tap((task) => this._tasks$.next([task, ...this._tasks$.value])),
      finalize(() => console.log('Task added'))
    );
  }

  updateTask(payload: UpdateTask): Observable<Task> {
    return this.updateTaskUseCase.execute(payload).pipe(
      tap((updatedTask) => {
        const updatedTasks = this._tasks$.value.map(task =>
          task.id === updatedTask.id ? { ...task, ...updatedTask } : task
        );
        const pending = updatedTasks.filter(t => !t.completed);
        const completed = updatedTasks.filter(t => t.completed);
        const nextList = [...pending, ...completed];
        this._tasks$.next(nextList);
      }),
      finalize(() => console.log('Task updated'))
    );
  }

  removeTask(id: number): Observable<void> {
    return this.deleteTaskUseCase.execute(id).pipe(
      tap(() => this._tasks$.next(this._tasks$.value.filter(task => task.id !== id))),
      finalize(() => console.log('Task removed'))
    );
  }
}
