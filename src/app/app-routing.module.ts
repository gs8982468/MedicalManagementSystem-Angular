import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CustomerFetchComponent } from './customer/customer-fetch/customer-fetch.component';
import { RegisterUserComponent } from './customer/register-user/register-user.component';
import { UserLoginComponent } from './customer/user-login/user-login.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'fetchUser', component: CustomerFetchComponent},
  {path: 'registration', component: RegisterUserComponent},
  {path: 'login', component: UserLoginComponent}
  // {path:'', redirectTo:'fetchUser', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
