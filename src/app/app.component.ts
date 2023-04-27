import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { catchError, of, take } from 'rxjs';
import { LoginFormComponent } from './login-form/login-form.component';
import { LoginService } from './login.service';
import { WelcomeComponent } from './welcome/welcome.component';
import { HttpClientModule, HttpResponse } from '@angular/common/http';

@Component({
  standalone: true,
  imports: [WelcomeComponent, LoginFormComponent, CommonModule, HttpClientModule],
  selector: 'app-root',
  providers: [LoginService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isAuthed = false
  errorMessage = '';
  username = ''

  constructor(private readonly loginService: LoginService) {}

  handleLogin(username: string, password: string): void {
    this.errorMessage = '';

    this.loginService.login(username, password).pipe(
      take(1),
      catchError((error: HttpResponse<any>) => {
        if (error.status === 401) {
          const message = 'Bad username or password';
          this.errorMessage = message
          return of(message)
        }
        const message = `error during the auth, status code: ${error.status}`
        this.errorMessage = message;
        return of(message)
      })
    ).subscribe((response) => {
      this.isAuthed = true;
      this.username = response
    })
  }

  logout(): void {
    this.isAuthed = false;
  }
}
