import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerFetchComponent } from './customer-fetch/customer-fetch.component';
import { CustomerModule } from './customer/customer.module';


@NgModule({
  declarations: [
    AppComponent,
    CustomerFetchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CustomerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
