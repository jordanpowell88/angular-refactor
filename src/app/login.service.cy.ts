import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { LoginService } from './login.service';

describe('LoginService', () => {
  it('should return a user if logged in', () => {
    cy.intercept('POST', '/auth', {}).then(async () => {
      TestBed.configureTestingModule({
        providers: [LoginService],
        imports: [HttpClientModule],
      });

      const loginService = TestBed.inject(LoginService);

      const res = await firstValueFrom(
        loginService.login('bob', 'the builder')
      );
      expect(res).to.equal('bob');
    });
  });
});
