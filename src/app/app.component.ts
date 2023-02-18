import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // title = 'Medical app';
  user: any;
  constructor(private userService: UserService,
    private router: Router) {}

    ngOnInit(): void {
      this.router.navigate(['/home']);
    }
  

  fetchUser(){
    this.userService.getUser().subscribe((data)=>{
      this.user = data; 
      console.log(this.user);
      localStorage.setItem("UserInfo", JSON.stringify(this.user))
    })  
  }
  
  onClickRegistrationPage(){
      // this.router.navigate(['register']);
      this.router.navigate(['/registration']);
  }



}
