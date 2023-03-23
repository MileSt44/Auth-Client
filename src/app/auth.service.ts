import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // The base URL of the API server
  private baseUrl = 'http://localhost:3000'; 

  // HTTP options to be used for API calls
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  // BehaviorSubject to hold the authentication token
  private tokenSubject = new BehaviorSubject<string>('');
  public token$ = this.tokenSubject.asObservable();

  constructor(private http: HttpClient) {
    // Check for a stored token and set the value of the BehaviorSubject accordingly
    const token = localStorage.getItem('token');
    if (token) {
      this.tokenSubject.next(token);
    }
  }

  // Method for logging in with a username and password
  public login(username: string, password: string): Observable<any> {
    const loginUrl = `${this.baseUrl}/login`;
    const body = { username, password };
    return this.http.post(loginUrl, body, this.httpOptions).pipe(
      // Save the token from the response and update the BehaviorSubject with it
      tap((response: any) => {
        const token = response.token;
        this.tokenSubject.next(token);
        // Save the token to local storage for persistence
        localStorage.setItem('token', token);
      })
    );
  }

  // Method for logging out
  public logout(): void {
    // Clear the token in the BehaviorSubject and remove it from local storage
    this.tokenSubject.next('');
    localStorage.removeItem('token');
  }

  // Method for getting the current authentication token
  public getToken(): string {
    return this.tokenSubject.value;
  }

  // Method for checking if the user is logged in
  public isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}

