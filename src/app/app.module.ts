import { BrowserModule } from '@angular/platform-browser';
import { RegisterComponent } from './register/register.component';
import { SampleComponent } from './sample/sample.component';
import { LoginComponent } from './login/login.component';
import { IndexComponent } from './index/index.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgModule } from '@angular/core';  
import { AppRoutingModule } from './app-routing.module';  
import { AppComponent } from './app.component';  
import { CommonModule } from '@angular/common';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient} from '@angular/common/http';




// Import the SocialLoginModule, SocialAuthServiceConfig, and GoogleLoginProvider for social login
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { CarouselComponent } from './carousel/carousel.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';   
import { NgbdCarouselPause } from './ngbd-carousel-pause/ngbd-carousel-pause.component';
import { TranslationComponent } from './translation/translation.component';  

@NgModule({
    declarations: [
        // Declare the components used in the application
        AppComponent,
        RegisterComponent,
        SampleComponent,
        LoginComponent,
        IndexComponent,
        CarouselComponent,
        NgbdCarouselPause,
        TranslationComponent       
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
                        '845181127864-f9j8f32j0ufsfi4spn21tapsi0k3r9k2.apps.googleusercontent.com')
                    }
                ],
                
                onError: (err) => {
                    console.error(err);
                }
            } as SocialAuthServiceConfig,
        }
    ],
    bootstrap: [AppComponent],
    imports: [
        // Import the required modules
        BrowserModule,
        CommonModule,
        NgbCarouselModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        SocialLoginModule, // Add the SocialLoginModule to imports array
        NgbModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })        
    ]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(http);
}
