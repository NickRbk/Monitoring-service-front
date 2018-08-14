import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Customer} from '../../shared/model/customer.model';
import {AuthenticatedStoreService} from '../../shared/service/authenticated-store.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() closeSideNav = new EventEmitter<void>();
  @Input() currentUser: Customer;

  constructor(private authenticatedStoreService: AuthenticatedStoreService) { }

  ngOnInit() {
  }

  logout() {
    this.authenticatedStoreService.logout();
  }

  onClose() {
    this.closeSideNav.emit();
  }
}
