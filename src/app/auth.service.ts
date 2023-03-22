import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000'; 
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  private tokenSubject = new BehaviorSubject<string | null>(null);
  public token$ = this.tokenSubject.asObservable();

  constructor(private http: HttpClient) {
    // check token and set value
    const token = localStorage.getItem('token');
    if (token) {
      this.tokenSubject.next(token);
    }
  }

  public login(username: string, password: string): Observable<any> {
    const loginUrl = `${this.baseUrl}/login`;
    const body = { username, password };
    return this.http.post(loginUrl, body, this.httpOptions).pipe(
      tap((response: any) => {
        const token = response.token;
        this.tokenSubject.next(token);
        // save token to local 
        localStorage.setItem('token', token);
      })
    );
  }

  public logout(): void {
    this.tokenSubject.next(null);
    localStorage.removeItem('token');
  }

  public getToken(): string | null {
    return this.tokenSubject.value;
  }
}



