import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterUserComponent } from './register-user/register-user.component';
import { UserLoginComponent } from './user-login/user-login.component';



@NgModule({
  declarations: [
    RegisterUserComponent,
    UserLoginComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CustomerModule { }
