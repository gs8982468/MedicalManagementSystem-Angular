import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { UserRegistration } from 'src/app/model/UserRegistration';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit{
  userRegistration: UserRegistration= new UserRegistration();

  constructor(private userService: UserService, private router: Router) {}


  ngOnInit(): void {

  }

  onSubmit(){
    console.log(this.userRegistration);
    console.log("Hi I am in onSubmit method");
    this.registerUser();
    this.router.navigate(['/home']);
  }

  registerUser(){
    this.userService.registerUser(this.userRegistration).subscribe(data=>
      {console.log(data);}, error=> console.log(error)
      );
  }

}
