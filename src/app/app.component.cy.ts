import { provideStore } from "@ngrx/store"
import { MountConfig } from "cypress/angular"
import { AppComponent } from "./app.component"
import { LOGIN_FEATURE, loginReducer } from "./login-form/login.reducer"
import { provideStoreDevtools } from "@ngrx/store-devtools"
import { isDevMode } from "@angular/core"
import { provideEffects } from "@ngrx/effects"
import { provideHttpClient } from "@angular/common/http"
import { LoginEffects } from "./login-form/login.effects"
import { ROOT_PROVIDERS } from "src/main"

describe('AppComponent', () => {
    const config: MountConfig<AppComponent> = {
        providers: ROOT_PROVIDERS
    }
    
    it('should redirect to welcome screen when creds are correct', () => {
        cy.mount(AppComponent, config)
        cy.contains('Username').find('input').type('testuser')
        cy.contains('Password').find('input').type('testPassword')
        cy.intercept('POST', '/auth', {
            statusCode: 200,
        })
        cy.get('button').contains('Login').contains('Login').click()
        cy.contains('Welcome testuser')
    })

    it('should show error message when creds are incorrect', () => {
        cy.mount(AppComponent, config)
        cy.contains('Username').find('input').type('baduser')
        cy.contains('Password').find('input').type('badpassword')
        cy.intercept('POST', '/auth', {
            statusCode: 401,
        })
        cy.get('button').contains('Login').click()
        cy.contains('Bad username or password')
    })
})