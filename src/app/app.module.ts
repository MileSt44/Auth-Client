import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { SampleComponent } from './sample/sample.component';
import { LoginComponent } from './login/login.component';
import { IndexComponent } from './index/index.component';
import { FormsModule } from '@angular/forms';
import { GoogleOauthModule, NG_GAPI_CONFIG, NgGapiClientConfig } from 'ngx-gapi-auth2';

interface MyGapiClientConfig extends NgGapiClientConfig {
  discoveryDocs?: string[];
}

const gapiClientConfig: MyGapiClientConfig = {
  client_id: '845181127864-f9j8f32j0ufsfi4spn21tapsi0k3r9k2.apps.googleusercontent.com',
  ux_mode: 'popup',
  redirect_uri: 'http://localhost:4200/redirect',
  discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
  e2e: false
};

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    SampleComponent,
    LoginComponent,
    IndexComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    GoogleOauthModule.forRoot({
      provide: NG_GAPI_CONFIG,
      useValue: gapiClientConfig
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
