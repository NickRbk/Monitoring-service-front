import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Customer} from '../../shared/model/customer.model';
import {AuthService} from '../../shared/service/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private authStatusSub: Subscription;

  @Output() closeSideNav = new EventEmitter<void>();
  @Input() currentUser: Customer;

  constructor(private authenticatedStoreService: AuthService) { }

  ngOnInit() {
    this.userIsAuthenticated = this.authenticatedStoreService.getIsAuth();
    this.authStatusSub = this.authenticatedStoreService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => this.userIsAuthenticated = isAuthenticated);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

  logout() {
    this.authenticatedStoreService.logout();
  }

  onClose() {
    this.closeSideNav.emit();
  }
}
