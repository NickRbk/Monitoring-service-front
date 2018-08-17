import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../shared/service/auth.service';
import {ErrorService} from '../../shared/service/error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error = '';

  constructor(private authService: AuthService,
              private errorService: ErrorService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required])
    });

    this.errorService.errorListener
      .subscribe(error => this.error = error);
  }

  onSubmit() {
    const {email, password} = this.loginForm.value;
    this.authService.logIn(email, password);
  }
}
