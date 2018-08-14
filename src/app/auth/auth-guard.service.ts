import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {AuthenticatedStoreService} from '../shared/service/authenticated-store.service';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private authService: AuthenticatedStoreService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.isAuthenticated();
  }
}
