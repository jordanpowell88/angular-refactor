import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoginFormComponent } from './login-form/login-form.component';
import { login, logout } from './login-form/login.actions';
import { selectAppComponentViewModel } from './login-form/login.selectors';
import { WelcomeComponent } from './welcome/welcome.component';

@Component({
  standalone: true,
  imports: [WelcomeComponent, LoginFormComponent, CommonModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private readonly store = inject(Store);
  vm$ = this.store.select(selectAppComponentViewModel);


  handleLogin(username: string, password: string): void {
    this.store.dispatch(login({ username, password }))
  }

  handleLogout(): void {
    this.store.dispatch(logout())
  }
}
