import { Component, OnInit } from '@angular/core';
import { StorageService } from './services/storage.service';
import { AuthService } from './services/auth.service';
import { SocialAuthService } from "@abacritt/angularx-social-login";
import { SocialUser } from "@abacritt/angularx-social-login";
import { Router, NavigationEnd } from '@angular/router';
import {TranslateService} from "@ngx-translate/core";

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
  isHomePage = false;
  isSamplePage = false;
  isLoginPage = false;
  isRegisterPage = false;

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private socialAuthService: SocialAuthService,
    private router: Router,
    private translate: TranslateService
  ) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  ngOnInit(): void {
    // Set initial route-related variables based on current route URL
    this.isHomePage = (this.router.url === '/');
    this.isSamplePage = (this.router.url === '/sample');
    this.isLoginPage = (this.router.url === '/login');
    this.isRegisterPage = (this.router.url === '/register');
  
    // Subscribe to router events to update route-related variables
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isHomePage = (event.urlAfterRedirects === '/');
        this.isSamplePage = (event.urlAfterRedirects === '/sample');
        this.isLoginPage = (event.urlAfterRedirects === '/login');
        this.isRegisterPage = (event.urlAfterRedirects === '/register');
      }
    });

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

  // Function to check if user has a specific role
  hasRole(role: string): boolean {
    return this.roles.includes(role);
  }
}
