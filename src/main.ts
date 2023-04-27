import { enableProdMode, isDevMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { provideStore } from '@ngrx/store';
import { LOGIN_FEATURE, loginReducer } from './app/login-form/login.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { LoginEffects } from './app/login-form/login.effects';
import { LoginService } from './app/login.service';
import { provideHttpClient } from '@angular/common/http';

if (environment.production) {
  enableProdMode();
}

export const ROOT_PROVIDERS = [
  provideStore({ [LOGIN_FEATURE]: loginReducer }),
  provideStoreDevtools({
    maxAge: 25, // Retains last 25 states
    logOnly: !isDevMode(), // Restrict extension to log-only mode
    autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
    traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
  }),
  provideEffects(LoginEffects),
  provideHttpClient()
]

bootstrapApplication(AppComponent, {
  providers: [
    ...ROOT_PROVIDERS
  ]
})