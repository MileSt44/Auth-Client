import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.scss']
})
export class SampleComponent {
  isLoggedIn = false;
  userName: string;

  constructor(private authService: AuthService, private router: Router) {
    this.isLoggedIn = this.authService.isAuthenticated();
    this.userName = this.authService.getUserName();
  }

  // Add this method to check if the user is authenticated
  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
  
  // Add this method to navigate to the login page if the user is not authenticated
  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
