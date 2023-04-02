import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  // Implement the canActivate method of the CanActivate interface
  canActivate(): boolean {
    // Call the AuthService's isLoggedIn method to check if the user is logged in
    if (this.authService.isLoggedIn()) {
      // If the user is logged in, allow access to the requested route
      return true;
    } else {
      // If the user is not logged in, redirect to the login page and disallow access to the requested route
      this.router.navigate(['/login']);
      return false;
    }
  }
}
