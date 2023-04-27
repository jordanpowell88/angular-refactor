import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';
import { LoginService } from '../login.service';
import { Store } from '@ngrx/store';
import { login } from './login.actions';
import { selectErrorMessage } from './login.selectors';

interface Login {
  username: FormControl<string>
  password: FormControl<string>
}

@Component({
  standalone: true,
  imports: [FormsModule, ButtonComponent, CommonModule, ReactiveFormsModule],
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  submitted = false;

  loginForm = new FormGroup<Login>({
    username: new FormControl('', { nonNullable: true, validators: Validators.required }),
    password: new FormControl('', { nonNullable: true, validators: Validators.required })
  })
  
  readonly store = inject(Store);

  errorMessage$ = this.store.select(selectErrorMessage);  


  handleFormSubmit(): void {
    this.submitted = true;

    if (!this.loginForm.controls.username.value || !this.loginForm.controls.password.value) return;

    this.store.dispatch(login({ username: this.loginForm.controls.username.value, password: this.loginForm.controls.password.value }))
  }
}
