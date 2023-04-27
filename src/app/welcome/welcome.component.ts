import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { Store } from '@ngrx/store';
import { selectUsername } from '../login-form/login.selectors';
import { logout } from '../login-form/login.actions';
import { AsyncPipe } from '@angular/common';

@Component({
  standalone: true,
  imports: [ButtonComponent, AsyncPipe],
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {
  readonly store = inject(Store)
  username$ = this.store.select(selectUsername);


  handleLogout() {
    this.store.dispatch(logout())
  }
}
