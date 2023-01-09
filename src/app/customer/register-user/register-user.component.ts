import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { UserRegistrationResponse } from 'src/app/model/ResponseModel/UserRegistrationResponse';
import { UserRegistration } from 'src/app/model/UserRegistration';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit{
  userRegistration: UserRegistration= new UserRegistration();
  userRegistrationResponse: UserRegistrationResponse= new UserRegistrationResponse();

  constructor(private userService: UserService, private router: Router) {}


  ngOnInit(): void {

  }

  onSubmit(){
    // userRegistrationResponse1: any;
    console.log(this.userRegistration);
    console.log("Hi I am in onSubmit method");
    this.userRegistrationResponse =  this.registerUser();
    // console.log(this.userRegistrationResponse.registrationStatus);
    alert(this.userRegistrationResponse);
    console.log(this.userRegistrationResponse.registrationStatus);
    this.router.navigate(['/home']);
  }

  onCancel(){
    console.log("Hi I am in onCancel method");
   
    this.router.navigate(['/home']);
  }

  registerUser(): any{
    this.userService.registerUser(this.userRegistration).subscribe(data=>
      {
        console.log("Line no 42: (registerUser method)", data);
        // console.log(ata);
        this.userRegistrationResponse=data;
        return this.userRegistrationResponse;
      }, error=> console.log(error)
      );
  }

}
