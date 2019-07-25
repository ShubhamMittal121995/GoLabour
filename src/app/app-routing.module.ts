import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { MainComponent } from './main/main.component';
import { AccountComponent } from './account/account.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {path : "Main", component : MainComponent},
  {path : "Home", component : HomeComponent},
  {path : "Login", component : SigninComponent},
  {path : "Signup", component : SignupComponent},
  {path : "MyAccount", component : AccountComponent},
  {path : "labourLogin", component : LoginComponent},
  {path : "register", component : RegisterComponent},
  {path : "dashboard", component : DashboardComponent},
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
