import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../shared/service/auth.service';
import {ErrorService} from '../../shared/service/error.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit, OnDestroy {
  signupForm: FormGroup;
  private errorSub: Subscription;
  error = '';

  constructor(private authService: AuthService,
              private errorService: ErrorService) { }

  ngOnInit() {
    this.errorSub = this.errorService.errorListener
      .subscribe(error => this.error = error);

    this.signupForm = new FormGroup({
      'firstName': new FormControl(null, [Validators.required]),
      'lastName': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'phoneNumber': new FormControl(null, [Validators.required, Validators.minLength(10)]),
      'agree': new FormControl(null, [Validators.required])
    });
  }

  onSubmit() {
    this.authService.signUp(this.signupForm.value);
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }
}
