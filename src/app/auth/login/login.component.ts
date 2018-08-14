import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticatedStoreService} from '../../shared/service/authenticated-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error = '';

  constructor(private authenticatedStoreService: AuthenticatedStoreService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required])
    });

    this.authenticatedStoreService.authError
      .subscribe(error => this.error = error);
  }

  onSubmit() {
    const {email, password} = this.loginForm.value;
    this.authenticatedStoreService.logIn(email, password);
  }
}
