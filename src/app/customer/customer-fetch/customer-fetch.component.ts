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

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getuser();
    console.log(this.user);

  /*  this.user={
      primaryEmailAddress:'sg@gmail.com',
      userName: 'string',
      primaryMobileNumber:'9564961878',
      "registrationInfo": {}
    }*/


  }

  private getuser(){
    this.userService.getUser().subscribe(data=> {
        this.user= data;
    });
  
  }


  

}
