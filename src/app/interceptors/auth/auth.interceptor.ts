import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpXsrfTokenExtractor,
} from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../services/auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private cookieService: CookieService,
    private tokenExtractor: HttpXsrfTokenExtractor,
    private authService: AuthService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.cookieService.set(
      'X-XSRF-TOKEN',
      <string>this.tokenExtractor.getToken()
    );
    request = request.clone({
      withCredentials: true,
    });

    const cookieHeaderName = 'X-XSRF-TOKEN';
    let csrfToken = this.tokenExtractor.getToken() as string;
    if (csrfToken !== null && !request.headers.has(cookieHeaderName)) {
      request = request.clone({
        headers: request.headers.set(cookieHeaderName, csrfToken),
      });
    }

    return next
      .handle(request)
      .pipe(catchError((err) => this.handleAuthError(err)));
  }

  private handleAuthError(error: HttpErrorResponse): Observable<any> {
    if (error.status === 400) {
      const modalTitle = document.getElementById('exampleModalLabel');
      if (modalTitle) {
        modalTitle.innerText = 'Registration Error';
      }

      const modalText = document.getElementById('modalText');
      if (modalText) {
        modalText.innerText = error.error.errors[0].msg;
      }
    }

    if (error.status === 401) {
      this.authService.logout();
      const modalTitle = document.getElementById('exampleModalLabel');
      if (modalTitle) {
        modalTitle.innerText = 'Authentication Error';
      }
      const modalText = document.getElementById('modalText');
      if (modalText) {
        modalText.innerText = 'Invalid username or password';
      }
      // @ts-ignore
      const modal = new bootstrap.Modal(document.getElementById('modal'), {});
      if (modal) {
        modal.show();
      }
      return of(error.message);
    }

    if (error.status === 403) {
      this.router.navigate(['/error/forbidden']);
    }

    if (error.status === 409) {
      const modalTitle = document.getElementById('exampleModalLabel');
      if (modalTitle) {
        modalTitle.innerText = 'Registration Error';
      }
      const modalText = document.getElementById('modalText');
      if (modalText) {
        modalText.innerText = 'User already exists';
      }
    }
    throw error;
  }
}
