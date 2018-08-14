import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Customer} from '../model/customer.model';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';

@Injectable()
export class AuthenticatedStoreService {
  currentUserData = new Subject<Customer>();
  authError = new Subject<string>();
  token: string;

  private currentUser: Customer;

  constructor(private httpClient: HttpClient,
              private router: Router) {}

  signUp() {

  }

  logIn(email: string, password: string) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response' as 'response'
    };

    this.httpClient.post('http://localhost:8080/login', {email, password}, httpOptions)
      .subscribe(
        res => console.log(res.headers.get('authorization').replace('Bearer ', '')),
        err => console.log(err)
      );
  }

  logout() {

  }

  isAuthenticated() {
    return this.token != null;
  }

  getCurrentUser() {
    return this.currentUser;
  }
}
