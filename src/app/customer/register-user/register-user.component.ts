import { Component, OnInit } from '@angular/core';
import { UserRegistration } from 'src/app/model/UserRegistration';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit{
  userRegistration: UserRegistration= new UserRegistration();
  constructor() {}


  ngOnInit(): void {

  }

  onSubmit(){

  }

}
