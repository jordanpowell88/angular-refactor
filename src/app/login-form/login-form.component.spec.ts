import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFormComponent } from './login-form.component';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ LoginFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('emits onLogin when a username and password is present', () => {
    const username = 'jordanpowell8';
    const password = 'password';
    component.username = username;
    component.password = password;
    const onLoginSpy = spyOn(component.onLogin, 'emit');
    
    component.handleFormSubmit();
    expect(component.submitted).toBeTruthy();
    expect(onLoginSpy).toHaveBeenCalledWith({ username, password });
  });

  it('returns without calling emit on onLogin when no username', () => {
    const password = 'password';
    component.password = password;
    const onLoginSpy = spyOn(component.onLogin, 'emit');

    component.handleFormSubmit();
    expect(component.submitted).toBeTruthy();
    expect(onLoginSpy).toHaveBeenCalledTimes(0);
  })

  it('returns without calling emit on onLogin when no password', () => {
    const username = 'jordanpowell88';
    component.username = username;
    const onLoginSpy = spyOn(component.onLogin, 'emit');

    component.handleFormSubmit();
    expect(component.submitted).toBeTruthy();
    expect(onLoginSpy).toHaveBeenCalledTimes(0);
  })
});
