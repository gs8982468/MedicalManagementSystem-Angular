import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/User';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-customer-fetch',
  templateUrl: './customer-fetch.component.html',
  styleUrls: ['./customer-fetch.component.css']
})
export class CustomerFetchComponent {
  user: any;
  UserInfo:any;
  constructor(private userService: UserService) {}

  ngOnInit() {
    console.log("ENtering into Customer ts : line no 18");
    // console.log(this.user);
  //  this.UserInfo =  localStorage.getItem("UserInfo");
  //  this.user= JSON.parse(this.UserInfo)
   console.log(this.user);
  }

  public getUser(){
    this.userService.getUser().subscribe((data)=>{
      this.user = data; 
      console.log(this.user);
      // localStorage.setItem("UserInfo", JSON.stringify(this.user))
    })  

  }




  

  
}


