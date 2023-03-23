import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SampleComponent } from './sample/sample.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { IndexComponent } from './index/index.component';
import { AuthGuard } from './auth.guard';

// Define the routes for the application
const routes: Routes = [
  { path: 'sample', component: SampleComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'index', component: IndexComponent }
];

@NgModule({
  // Import the defined routes into the Angular module
  imports: [RouterModule.forRoot(routes)],
  // Export the RouterModule so that the routes can be used elsewhere in the application
  exports: [RouterModule]
})
export class AppRoutingModule { }
