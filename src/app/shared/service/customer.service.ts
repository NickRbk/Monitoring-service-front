import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Customer} from '../model/customer.model';
import {HttpClient} from '@angular/common/http';
import {ErrorService} from './error.service';

@Injectable({ providedIn: 'root' })
export class CustomerService {
  private currentUser: Customer;
  currentUserListener = new Subject<Customer>();

  getCurrentUser(): Customer {
    return this.currentUser;
  }

  setCurrentUser(value: Customer) {
    this.currentUser = value;
  }

  constructor(private httpClient: HttpClient,
              private errorService: ErrorService) {}

  public fetchCustomer() {
    this.httpClient.get<Customer>('http://localhost:8080/auth')
      .subscribe(
        customer => {
          this.currentUser = customer;
          this.saveCurrentUserData(customer);
          this.currentUserListener.next(customer);
        },
        err => {
          this.errorService.errorListener.next(err['message']);
          this.errorService.setErrorTimeOut();
        }
      );
  }

  private saveCurrentUserData(customer: Customer) {
    localStorage.setItem('c:id', `${customer.id}`);
    localStorage.setItem('c:email', customer.email);
    localStorage.setItem('c:firstName', customer.firstName);
    localStorage.setItem('c:lastName', customer.lastName);
    localStorage.setItem('c:phoneNumber', customer.phoneNumber);
  }
}
