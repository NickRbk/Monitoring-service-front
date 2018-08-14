import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Customer} from '../../shared/model/customer.model';
import {AuthenticatedStoreService} from '../../shared/service/authenticated-store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sideNavToggle = new EventEmitter<void>();
  @Input() currentUser: Customer;

  constructor(private authenticatedStoreService: AuthenticatedStoreService) { }

  ngOnInit() {
  }

  logout() {
    this.authenticatedStoreService.logout();
  }

  onToggleSideNav() {
    this.sideNavToggle.emit();
  }
}
