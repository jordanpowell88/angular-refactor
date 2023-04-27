import { MountConfig } from "cypress/angular"
import { ROOT_PROVIDERS } from "src/main"
import { LoginFormComponent } from "./login-form.component"
import { login } from "./login.actions"

describe('LoginFormComponent', () => {
    const config: MountConfig<LoginFormComponent> = {
      providers: ROOT_PROVIDERS
    } 
    it('can mount', () => {
        cy.mount(LoginFormComponent, config)
    })

    it('should have password input of type password', () => {
        cy.mount(LoginFormComponent, config);
        cy.contains('Password').find('input').should('have.attr', 'type', 'password')
    })

    it('should render title with default text', () => {
        cy.mount(LoginFormComponent, config)
        cy.get('legend').should('have.text', 'Log In')
    })

    describe('form tests', () => {
        const username = 'testuser123';
        const password = 's3cret';

        beforeEach(() => {
            cy.mount(LoginFormComponent, config).then(response => {
                cy.spy(response.component.store, 'dispatch').as('onLoginSpy')
            })
            cy.contains('Username').find('input').as('usernameInput');
            cy.contains('Password').find('input').as('passwordInput');
            cy.get('button').contains('Login').as('loginButton');
        })

        it('should call onLogin with username and password when the Login button is clicked', () => {
            cy.get('@usernameInput').type(username)
            cy.get('@passwordInput').type(password)
            cy.get('@loginButton').click()
            cy.get('@onLoginSpy').should('have.been.calledWith', {
                username,
                password,
                type: login.type
            })
        })

        it('should call onLogin with username and password when enter is pressed in an input', () => {
            cy.get('@usernameInput').type(username);
            cy.get('@passwordInput').type(password).type('{enter}')
            cy.get('@onLoginSpy').should('have.been.calledWith', {
                username,
                password,
                type: login.type
            })
        })
        
        it('should show both validation errors if login is attempted without entering username or password', () => {
            cy.get('@loginButton').click();
            cy.contains('Username is required')
            cy.contains('Password is required')
            cy.get('@onLoginSpy').should('have.not.been.called')
        })

        it('should only show password validation error if login is attempted without entering password', () => {
            cy.get('@usernameInput').type(username)
            cy.get('@loginButton').click()
            cy.contains('Username is required').should('not.exist')
            cy.contains('Password is required')
            cy.get('@onLoginSpy').should('not.have.been.called')
        })

        it('should only show username validation error if login is attempted without entering username', () => {
            cy.get('@passwordInput').type(password)
            cy.get('@loginButton').click()
            cy.contains('Username is required')
            cy.contains('Password is required').should('not.exist')
            cy.get('@onLoginSpy').should('not.have.been.called')
        })

        it('should not show any validation errors before login is attempted', () => {
            cy.contains('Username is required').should('not.exist')
            cy.contains('Password is required').should('not.exist')
        })
    })
})