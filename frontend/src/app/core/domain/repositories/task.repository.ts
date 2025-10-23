import { Observable } from 'rxjs';
import { Task, CreateTask, UpdateTask } from '../models/task.model';
import {InjectionToken} from "@angular/core";

export abstract class TaskRepository {
  abstract getAll(): Observable<Task[]>;
  abstract addTask(task: CreateTask): Observable<Task>;
  abstract updateTask(task: UpdateTask): Observable<Task>;
  abstract deleteTask(id: number): Observable<void>;
}
export const INJECTION_TOKEN = new InjectionToken<TaskRepository>('TaskRepository');
