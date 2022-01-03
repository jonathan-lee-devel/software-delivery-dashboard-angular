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

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private cookieService: CookieService,
    private tokenExtractor: HttpXsrfTokenExtractor
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.cookieService.set(
      'X-XSRF-TOKEN',
      <string>this.tokenExtractor.getToken()
    );
    const cookieHeaderName = 'X-XSRF-TOKEN';
    let csrfToken = this.tokenExtractor.getToken() as string;
    console.log(`csrfToken = ${csrfToken}`);
    if (csrfToken !== null && !request.headers.has(cookieHeaderName)) {
      request = request.clone({
        headers: request.headers.set(cookieHeaderName, csrfToken),
      });
    }
    console.log(`request = ${JSON.stringify(request)}`);
    return next
      .handle(request)
      .pipe(catchError((err) => this.handleAuthError(err)));
  }

  private handleAuthError(error: HttpErrorResponse): Observable<any> {
    if (error.status === 401) {
      this.router.navigate(['/login']);
      window.alert('Invalid login credentials');
      return of(error.message);
    }

    if (error.status === 403) {
      this.router.navigate(['/error/forbidden']);
    }
    throw error;
  }
}
