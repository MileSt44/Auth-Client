import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { sha512 } from 'sha512-crypt-ts';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: User = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    let originalPassword = this.form.password;
    const hashedPassword = sha512.crypt(this.form.password, "s@lt4all");

    if (this.form.confirmPassword!=this.form.password){
        this.errorMessage = "Passwords don't match!";
        this.isSignUpFailed = true;
    }
    else{
      this.form.password = hashedPassword;
      this.form.confirmPassword=hashedPassword;
      
  
      this.authService.register(this.form).subscribe({
        next: data => {
          this.isSuccessful = true;
          this.isSignUpFailed = false;
        },
        error: err => {
          console.log(err);
          this.form.password = originalPassword;
          this.form.confirmPassword = originalPassword;
          this.errorMessage = err.error.detail;
          this.isSignUpFailed = true;
        }
      });
    }
    
  }
}
