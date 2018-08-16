import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {AuthService} from '../shared/service/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authenticatedStoreService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.authenticatedStoreService.getToken();
    if (authToken) {
      const authRequest = req.clone({
        headers: req.headers.set('Authorization', authToken)
      });
      return next.handle(authRequest);
    }
    return next.handle(req);
  }
}
