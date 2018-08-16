import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticatedStoreService} from '../../shared/service/authenticated-store.service';
import {Customer} from '../../shared/model/customer.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  error = '';

  constructor(private authenticatedStoreService: AuthenticatedStoreService) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      'firstName': new FormControl(null, [Validators.required]),
      'lastName': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'phoneNumber': new FormControl(null, [Validators.required, Validators.minLength(10)]),
      'agree': new FormControl(null, [Validators.required])
    });

    this.authenticatedStoreService.authError
      .subscribe(error => this.error = error);
  }

  onSubmit() {
    this.authenticatedStoreService.signUp(this.signupForm.value);
  }
}
