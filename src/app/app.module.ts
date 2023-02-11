import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerFetchComponent } from './customer/customer-fetch/customer-fetch.component';
import { CustomerModule } from './customer/customer.module';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { UserRegistration } from './model/UserRegistration';
import { RegisterUserComponent } from './customer/register-user/register-user.component';



@NgModule({
  declarations: [
    AppComponent,
    CustomerFetchComponent,
    HomeComponent
    // RegisterUserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    CustomerModule,
    HttpClientModule ,
    ReactiveFormsModule   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
