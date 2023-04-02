import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SampleComponent } from './sample/sample.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  { path: 'sample', component: SampleComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'index', component: IndexComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
