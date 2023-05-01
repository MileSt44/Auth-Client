import { Component, OnInit } from '@angular/core';
import { StorageService } from './services/storage.service';
import { AuthService } from './services/auth.service';
import { SocialAuthService } from "@abacritt/angularx-social-login";
import { SocialUser } from "@abacritt/angularx-social-login";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  user?: SocialUser;
  currentDate = new Date(); // holds the current date and time as a Date object

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private socialAuthService: SocialAuthService
  ) {}

  ngOnInit(): void {
    // Check if user is logged in
    this.isLoggedIn = this.storageService.isLoggedIn();

    // Subscribe to social auth service to get user state
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      this.isLoggedIn = (user != null);
    });

    if (this.isLoggedIn) {
      // Get user information from storage if logged in
      const user = this.storageService.getUser();

      // Get user roles and username
      this.roles = user.roles;
      this.username = user.username;
    }

    // Update the current date and time every second
    setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
  }

  // Function to log user out
  logout(): void {
    // Call logout function from auth service
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
      },
      error: err => {
        console.log(err);
      }
    });

    // Clear user information from storage and refresh page
    this.storageService.clean();
    window.location.reload();
  }
}
