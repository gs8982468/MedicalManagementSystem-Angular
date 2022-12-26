import { Component } from '@angular/core';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-customer-fetch',
  templateUrl: './customer-fetch.component.html',
  styleUrls: ['./customer-fetch.component.css']
})
export class CustomerFetchComponent {
  user: User;

  constructor() {}

  ngOnInit(): void {
    this.user={
      primaryEmailAddress:'sg@gmail.com',
      userName: 'string',
      primaryMobileNumber:'9564961878',
      "registrationInfo": {}
    }


  }

}
