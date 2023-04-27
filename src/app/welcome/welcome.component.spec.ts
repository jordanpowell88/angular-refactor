import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeComponent } from './welcome.component';
import { provideMockStore } from '@ngrx/store/testing';
import { LoginState } from '../login-form/login.reducer';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ WelcomeComponent ],
      providers: [
        provideMockStore<LoginState>({
          initialState: { errorMessage: '', isAuthed: true, isLoading: false, username: 'Test User' }
        }),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
