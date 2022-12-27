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
  user: User;
  UserInfo:any;
  constructor(private userService: UserService) {}

  ngOnInit() {
   this.UserInfo =  localStorage.getItem("UserInfo");
   this.user= JSON.parse(this.UserInfo)
   console.log(this.user);
  }
}


