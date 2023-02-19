import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { sha512 } from 'sha512-crypt-ts';

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
  }

  onSubmit(): void {
    const { username, password } = this.form;

    const hashedPassword = sha512.crypt(this.form.password, "s@lt4all");
    // Zamini plain text s hasom
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
}
