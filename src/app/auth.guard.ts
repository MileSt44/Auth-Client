import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    console.log('AuthGuard activated');
    return this.authService.token$.pipe(
      map((token) => {
        if (token) {
          // If the user is logged in, allow access to the requested route
          console.log('User is logged in');
          return true;
        } else {
          // If the user is not logged in, save the URL of the requested route for later redirect
          console.log('User is not logged in');
          this.authService.redirectUrl = this.router.url;
          // Redirect to the login page
          this.router.navigate(['/login']);
          // Disallow access to the requested route
          return false;
        }
      })
    );
  }
}  
