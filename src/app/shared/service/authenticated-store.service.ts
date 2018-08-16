import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Customer} from '../model/customer.model';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {AuthDataModel} from '../model/auth-data.model';

@Injectable()
export class AuthenticatedStoreService {
  currentUserData = new Subject<Customer>();
  authError = new Subject<string>();

  private tokenTimer;
  private token: string;

  private currentUser: Customer;

  constructor(private httpClient: HttpClient,
              private router: Router) {}


  getCurrentUser() {
    return this.currentUser;
  }

  getToken() {
    return this.token || null;
  }

  signUp(customer: AuthDataModel) {
    this.httpClient.post('http://localhost:8080/auth/sign-up', customer)
      .subscribe(
        res => console.log(res)
      );
  }

  logIn(email: string, password: string) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response' as 'response'
    };

    this.httpClient.post<{email: string, password: string}>('http://localhost:8080/login',
      {email, password}, httpOptions)
      .subscribe(
        res => {
          this.token = res.headers.get('authorization');
          const expirationDate = new Date(+res.headers.get('expires'));
          this.saveAuthData(this.token, expirationDate);

          const now = new Date();
          const expiresIn: number = this.getAuthData().expirationDate.getTime() - now.getTime();
          this.setAuthTimer(expiresIn);

          this.getCustomer();
          this.router.navigate(['/']);
        },
        err => console.log(err)
      );
  }

  logout() {
    this.token = null;
    this.currentUserData.next(null);
    this.clearAuthData();
    this.router.navigate(['/']);
    clearTimeout(this.tokenTimer);
  }

  autoAuthUser() {
    const authInfo = this.getAuthData();
    if (!authInfo) {
      return;
    }
    const now = new Date();
    const expiresIn: number = authInfo.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInfo.token;
      this.setAuthTimer(expiresIn);
    }
  }

  private getCustomer() {
    this.httpClient.get<Customer>('http://localhost:8080/auth')
      .subscribe(
        res => this.currentUserData.next(res),
        err => console.log(err)
      );
  }

  private setAuthTimer(duration: number) {
    console.log('Setting timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
      this.router.navigate(['/login']);
    }, duration);
  }

  isAuthenticated() {
    return this.token != null;
  }

  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('serviceToken', token);
    localStorage.setItem('serviceTokenExpiration', expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem('serviceToken');
    localStorage.removeItem('serviceTokenExpiration');
  }

  private getAuthData() {
    const token = localStorage.getItem('serviceToken');
    const expirationDate = localStorage.getItem('serviceTokenExpiration');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token,
      expirationDate: new Date(expirationDate)
    };
  }
}
