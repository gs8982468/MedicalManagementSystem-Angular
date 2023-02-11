import { Component } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { User } from './model/User';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // title = 'Medical app';
  user: any;
  constructor(private userService: UserService) {}

  fetchUser(){
    this.userService.getUser().subscribe((data)=>{
      this.user = data; 
      console.log(this.user);
      localStorage.setItem("UserInfo", JSON.stringify(this.user))
    })  
  }
  



}
