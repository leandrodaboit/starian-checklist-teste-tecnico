import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import {INJECTION_TOKEN, TaskRepository} from './core/domain/repositories/task.repository';
import { TaskHttpRepository } from './core/infrastructure/api/task-http.repository';
import { tokenInterceptor } from "./core/infrastructure/interceptors/token.interceptor";
import { environment } from '../environments/environment';
import { API_URL } from './core/infrastructure/api/task-http.repository';
import { API_TOKEN } from "./core/infrastructure/api/api-tokens";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
      withInterceptors([tokenInterceptor])
    ),
    { provide: API_URL, useValue: environment.apiUrl },
    { provide: API_TOKEN, useValue: environment.apiToken },
    { provide: INJECTION_TOKEN, useValue: TaskHttpRepository },
    { provide: TaskRepository, useClass: TaskHttpRepository },
  ]
};
