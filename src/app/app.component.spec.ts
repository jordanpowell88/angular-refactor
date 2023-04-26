import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

describe('AppComponent', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AppComponent,
        HttpClientTestingModule,
      ]
    }).compileComponents();

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

 
  it('handles logout', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.isAuthed = true;
    app.logout();
    expect(app.isAuthed).toBeFalsy()
  })

  it('handles login', () => {
    const username = 'jordanpowell88'
    const testData = { message: username, status: 200 };
    httpClient.get('/auth')
      .subscribe(data =>
        expect(data).toEqual(testData)
      );
    const req = httpTestingController.expectOne('/auth');
    expect(req.request.method).toEqual('GET');
    req.flush(testData);
    httpTestingController.verify();
  })

  it('catches login errors', (done) => {
    const error = 'Bad username or password';
    const mockError = new ProgressEvent(error);

    httpClient.get('/auth').subscribe({
      next: () => fail('should have failed with the network error'),
      error: (error: HttpErrorResponse) => {
        expect(error.error).toBe(mockError);
        done();
      },
    });

    const req = httpTestingController.expectOne('/auth');

    // Respond with mock error
    req.error(mockError);
  });
});
