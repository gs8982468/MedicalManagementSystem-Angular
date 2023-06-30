import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
  constructor(
    private router: Router
    )
     {}

  onClickRegistrationPage(){
    // this.router.navigate(['register']);
    this.router.navigate(['/registration']);
}

}
