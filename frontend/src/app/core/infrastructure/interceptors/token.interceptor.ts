import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import {API_TOKEN} from "../api/api-tokens";
export const tokenInterceptor: HttpInterceptorFn = (request, handle) => {
  const token = inject(API_TOKEN);
  if (!token){
    return handle(request)
  }
  const requestWithToken = request.clone({
    setHeaders: { Authorization: `Bearer ${token}` }
  });
  return handle(requestWithToken);
};
