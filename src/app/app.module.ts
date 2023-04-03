import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { SampleComponent } from './sample/sample.component';
import { LoginComponent } from './login/login.component';
import { IndexComponent } from './index/index.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InfoBarComponent } from './info-bar/info-bar.component';

// Import the SocialLoginModule, SocialAuthServiceConfig, and GoogleLoginProvider for social login
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';

@NgModule({
  declarations: [
    // Declare the components used in the application
    AppComponent,
    RegisterComponent,
    SampleComponent,
    LoginComponent,
    IndexComponent,
    InfoBarComponent
  ],
  imports: [
    // Import the required modules
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SocialLoginModule // Add the SocialLoginModule to imports array
  ],
  providers: [
    {
      // Configure the SocialAuthServiceConfig for the GoogleLoginProvider
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              // Add the Google client ID for social login
              '845181127864-f9j8f32j0ufsfi4spn21tapsi0k3r9k2.apps.googleusercontent.com'
            )
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
