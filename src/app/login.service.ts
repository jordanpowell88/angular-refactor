import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class LoginService {
  private readonly http = inject(HttpClient);

  login(username: string, password: string): Observable<string> {
    return this.http.post<HttpResponse<string>>('/auth', { username, password }).pipe(
      map(() => (username)),
    )
  }
}
