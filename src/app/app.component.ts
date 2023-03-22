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
export class AppComponent implements OnInit{
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;  
  user?: SocialUser;

  constructor(private storageService: StorageService, 
    private authService: AuthService,
    private socialAuthService: SocialAuthService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      this.isLoggedIn = (user != null);
    });
    
    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;

      this.username = user.username;
    }
  }
  
  logout(): void {    
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        
      },
      error: err => {
        console.log(err);
      }
    });
    this.storageService.clean();

        window.location.reload();
  }
}