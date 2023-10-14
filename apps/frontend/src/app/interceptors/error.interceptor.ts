import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  //  this code is used to catch the error and if the error is 401 then it will logout the user and reload the page
  // Define a method named "intercept" which takes two parameters:
  intercept(
    request: HttpRequest<unknown>, // 1. The HTTP request being intercepted (HttpRequest) and
    next: HttpHandler // 2. The next HTTP handler in the chain (HttpHandler).
  ): Observable<HttpEvent<unknown>> {
    // Send the request to the next handler in the chain and handle it as an observable using the "pipe" method.
    return next.handle(request).pipe(
      // Use the "catchError" operator to handle errors in the observable stream.
      catchError((error) => {
        // Check if the error's status is 401 (Unauthorized).
        if (error?.status === 401) {
          this.authService.logout(); // If it's a 401 error, call a method in the "authService" to log the user out.
          location.reload(); // Reload the page to ensure a fresh state after logging out
        }
        return throwError(() => error?.error?.message); // Return an observable error with a custom error message from the error object, if available.
      })
    );
  }
}
