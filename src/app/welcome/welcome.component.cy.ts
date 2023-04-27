import { ROOT_PROVIDERS } from "src/main"
import { login } from "../login-form/login.actions"
import { WelcomeComponent } from "./welcome.component"

describe('WelcomeComponent', () => {
    it('should mount with greeting', () => {
        cy.mount(WelcomeComponent, {
           providers: [
            ROOT_PROVIDERS
           ]
        }).then(({ component }) => {
            component.store.dispatch(login({ username: 'Test User', password: '123' }))
        })
        cy.contains('h1', 'Welcome Test User')
    })

    it('when the log out button is clicked, onLogout should be called using autoSpyOutputs', () => {
        cy.mount(WelcomeComponent, {
            providers: [ROOT_PROVIDERS]
        }).then(({ component }) => {
            cy.spy(component.store, 'dispatch').as('logoutSpy')
        })
        cy.get('button').contains('Log Out').click()
        cy.get('@logoutSpy').should('have.been.calledOnce')
    })
})