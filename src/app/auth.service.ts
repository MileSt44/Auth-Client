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

  private tokenSubject = new BehaviorSubject<string>(null);
  public token$ = this.tokenSubject.asObservable();

  constructor(private http: HttpClient) {
    // provjeri token i stavi value
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

  public getToken(): string {
    return this.tokenSubject.value;
  }
}

//import { AuthService } from '../auth.service';
//constructor(private authService: AuthService) { }
//import { Component } from '@angular/core';
//import { AuthService } from '../auth.service';

//@Component({
  /*selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string;
  password: string;

  constructor(private authService: AuthService) { }

  login() {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        console.log('Login successful');
        // Redirect to the dashboard or home page
      },
      (error) => {
        console.log('Login failed');
        // Display an error message
      }
    );
  }
}*/
