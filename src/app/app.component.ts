import {Component, OnInit} from '@angular/core';
import {AuthenticatedStoreService} from './shared/service/authenticated-store.service';
import {Customer} from './shared/model/customer.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currentUser: Customer;

  constructor(private authenticatedStoreService: AuthenticatedStoreService) {}

  ngOnInit() {
    this.currentUser = this.authenticatedStoreService.getCurrentUser();
    this.authenticatedStoreService.currentUserData
      .subscribe(
        user => this.currentUser = user
      );
    this.authenticatedStoreService.autoAuthUser();
  }
}
