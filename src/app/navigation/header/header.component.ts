import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Customer} from '../../shared/model/customer.model';
import {AuthService} from '../../shared/service/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private authStatusSub: Subscription;

  @Output() sideNavToggle = new EventEmitter<void>();
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

  onLogout() {
    this.authenticatedStoreService.logout();
  }

  onToggleSideNav() {
    this.sideNavToggle.emit();
  }
}
