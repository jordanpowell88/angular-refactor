import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { LoginService } from "../login.service";
import { login, loginFailed, loginSuccess } from "./login.actions";
import { catchError, exhaustMap, map, of, switchMap } from "rxjs";

@Injectable()
export class LoginEffects {
    private readonly actions$ = inject(Actions);
    private readonly loginService = inject(LoginService);

    handleLogin$ = createEffect(() => 
      this.actions$.pipe(
        ofType(login),
        map(action => ({ username: action.username, password: action.password })),
        switchMap(({ username, password }) => this.loginService.login(username, password).pipe(
            map(() => loginSuccess({ username })),
            catchError((error) => {
              console.log(error)
              if (error.status === 401) {
                return of (loginFailed({ errorMessage: 'Bad username or password'}))
              }
              return of(loginFailed({ errorMessage: `error during the auth, status code: ${error.status}` }))
            })
        ))
      )
    )
}