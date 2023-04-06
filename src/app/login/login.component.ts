import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { sha512 } from 'sha512-crypt-ts';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  username: string = '';

  constructor(private authService: AuthService, private storageService: StorageService) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      console.log(this.storageService.getUser());
      this.isLoggedIn = true;
      let user = this.storageService.getUser();
      this.username = user.username;
    }
    this.initGoogleSignIn();
  }

  onSubmit(): void {
    const { username, password } = this.form;

    const hashedPassword = sha512.crypt(this.form.password, "s@lt4all");
    // Hash the plain text password with a salt

    this.form.password = hashedPassword;

    this.authService.login(username, hashedPassword).subscribe({
      next: data => {
        console.log(data);
        this.storageService.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.reloadPage();
      },
      error: err => {
        console.log(err);
        this.errorMessage = err.error;
        this.isLoginFailed = true;
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }

  initGoogleSignIn(): void {
    gapi.load('auth2', () => {
      gapi.auth2.init({
        client_id: '845181127864-f9j8f32j0ufsfi4spn21tapsi0k3r9k2.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin'
      }).then(() => {
        gapi.signin2.render('google-signin-button', {
          scope: 'profile email',
          width: 200,
          height: 50,
          longtitle: true,
          theme: 'dark',
          onsuccess: this.onGoogleSignIn.bind(this)
        });
      });
    });
  }

  onGoogleSignIn(googleUser: any): void {
    const profile = googleUser.getBasicProfile();
    const id_token = googleUser.getAuthResponse().id_token;

    // profile and id_token to sign in to your backend API
    console.log(profile, id_token);
  }

  signInWithGoogle(): void {
    gapi.auth2.getAuthInstance().signIn().then((user: any) => {
      console.log(user);
      // Use user.getBasicProfile() to access user's Google profile information
      // and user.getAuthResponse().id_token to access the user's ID token.
    });
  }
}
