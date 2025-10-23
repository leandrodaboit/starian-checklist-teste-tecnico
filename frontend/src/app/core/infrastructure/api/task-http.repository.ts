import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task, CreateTask, UpdateTask } from '../../domain/models/task.model';
import { TaskRepository } from '../../domain/repositories/task.repository';
import {inject, Injectable, InjectionToken} from "@angular/core";

export const API_URL = new InjectionToken<string>('API_URL');

type ListResponse<T> = { message?: string; data: T[] };
type ItemResponse<T> = { message: string; data: T };

@Injectable()
export class TaskHttpRepository extends TaskRepository {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${inject(API_URL)}/tasks`;
  getAll(): Observable<Task[]> {
    return this.http.get<ListResponse<Task>>(this.apiUrl).pipe(
      map(res => res.data ?? [])
    );
  }

  addTask(task: CreateTask): Observable<Task> {
    return this.http.post<ItemResponse<Task>>(this.apiUrl, task).pipe(
      map(res => res.data)
    );
  }

  updateTask(task: UpdateTask): Observable<Task> {
    return this.http.patch<ItemResponse<Task>>(`${this.apiUrl}/${task.id}`, task).pipe(
      map(res => res.data)
    );
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
