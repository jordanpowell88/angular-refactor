import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';
import { LoginService } from '../login.service';

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
  @Input() errorMessage = ''
  @Output() onLogin: EventEmitter<{ username: string, password: string }> = new EventEmitter()
  username = ''
  password = ''
  submitted = false


  loginForm = new FormGroup<Login>({
    username: new FormControl('', { nonNullable: true, validators: Validators.required }),
    password: new FormControl('', { nonNullable: true, validators: Validators.required })
  })

  handleFormSubmit(): void {
    this.submitted = true;
    console.log(this.loginForm.value)
    this.username = this.loginForm.controls.username.value;
    this.password = this.loginForm.controls.password.value;
    
    if (!this.username || !this.password) {
      return;
    }

    this.onLogin.emit({ username: this.username, password: this.password })
  }
}
