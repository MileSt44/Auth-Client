import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError, of } from 'rxjs';
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
  redirectUrl: string | undefined;
  user$: any;

  constructor(private http: HttpClient) {
    // Check for a stored token and set the value of the BehaviorSubject accordingly
    const token = sessionStorage.getItem('token');
    if (token) {
      this.tokenSubject.next(token);
      console.log('Token in AuthService constructor:', token);
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
        if (!token) {
          return throwError('Login failed: No token returned');
        }
        this.tokenSubject.next(token);
        // Save the token to session storage for persistence
        sessionStorage.setItem('token', token);
        console.log('Token saved to session storage:', token);
        console.log('Response from login API:', response);
        return of(response);
      })
    );
  }

  // Method for logging out
  public logout(): void {
    // Clear the token in the BehaviorSubject and remove it from session storage
    this.tokenSubject.next('');
    sessionStorage.removeItem('token');
  }

  // Method for getting the current authentication token
  public getToken(): string {
    return this.tokenSubject.value;
  }

  // Method for checking if the user is logged in
  public isLoggedIn(): boolean {
    return !!sessionStorage.getItem('token');
  }
  
  // Method for getting the current user name
  public getUserName(): string {
    const token = this.tokenSubject.value;
    if (!token) {
      return '';
    }
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload);
    const { username } = JSON.parse(decodedPayload);
    return username;
  }
  
  // Method for checking if the user is authenticated
  public isAuthenticated(): boolean {
    const token = this.tokenSubject.value;
    if (!token) {
      return false;
    }
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload);
    const expiration = JSON.parse(decodedPayload).exp;
    const expirationDate = new Date(expiration * 1000);
    const now = new Date();
    return now < expirationDate;
  }
}
