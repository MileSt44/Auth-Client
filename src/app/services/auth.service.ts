import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auth } from '../models/auth';
import {User} from '../models/user';

const AUTH_API = 'https://localhost:7235/api/authentication/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<Auth|any> {
    return this.http.post(
      AUTH_API + 'login',
      {
        'emailusername': username,
        password,
      },
      httpOptions
    );
  }

  register(user: User): Observable<any> {
    return this.http.post(
      AUTH_API + 'register',
      {
        'username': user.username,
        'email': user.email,
        'password': user.password,
        'confirmPassword': user.confirmPassword
      },
      httpOptions
    );
  }

  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'logout', { }, httpOptions);
  }
}