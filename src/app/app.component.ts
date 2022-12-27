import { Component } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { CustomerFetchComponent } from './customer/customer-fetch/customer-fetch.component';
import { User } from './model/User';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'medical-management-system-angular';
  user: any;
  constructor(private userService: UserService, private fetchCustomer: CustomerFetchComponent) {}

  // fetchUser(){
  //   console.log("Entering to third party call");
  //   this.userService.getUser().subscribe((data)=>{
  //     this.user = data; 
  //     console.log(this.user);
  //     localStorage.setItem("UserInfo", JSON.stringify(this.user))
  //   })  
  // }

  fetchUser(){
    console.log("Entering to third party call");
    this.fetchCustomer.getUser();
  }



}
