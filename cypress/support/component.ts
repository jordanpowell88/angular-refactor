// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import { provideStore } from '@ngrx/store';
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

import { mount } from 'cypress/angular'
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient } from '@angular/common/http';
import { LOGIN_FEATURE, loginReducer } from 'src/app/login-form/login.reducer';
import { LoginEffects } from 'src/app/login-form/login.effects';

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount
    }
  }
}

type MountParams = Parameters<typeof mount>;

Cypress.Commands.add('mount', (component: MountParams[0], config: MountParams[1] = {}) => {
  return mount(
    component,
    {
      ...config,
      providers: [
        ...(config.providers || []),
        provideStore({ [LOGIN_FEATURE]: loginReducer }),
        provideEffects(LoginEffects),
        provideHttpClient() 
      ]
    }
  )
})

// Example use:
// cy.mount(MyComponent)