import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticatedStoreService} from './shared/service/authenticated-store.service';
import {HttpClient, HttpHeaders} from '../../node_modules/@angular/common/http';
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
  }
  // loginForm: FormGroup;
  // error = '';
  // constructor(private httpClient: HttpClient) { }
  //
  // ngOnInit() {
  //   this.loginForm = new FormGroup({
  //     'email': new FormControl(null, [Validators.required, Validators.email]),
  //     'password': new FormControl(null, [Validators.required])
  //   });
  // }
  //
  // onSubmit() {
  //   const httpOptions = {
  //     headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  //     observe: 'response' as 'response'
  //   };
  //   this.httpClient.post('http://localhost:8080/login', this.loginForm.value, httpOptions)
  //     .subscribe(
  //       res => console.log(res.headers.get('authorization').replace('Bearer ', '')),
  //       err => console.log(err)
  //     );
  // }
}
