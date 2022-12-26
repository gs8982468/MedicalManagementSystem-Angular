import { Component } from '@angular/core';
import { user } from '../model/user';

@Component({
  selector: 'app-customer-fetch',
  templateUrl: './customer-fetch.component.html',
  styleUrls: ['./customer-fetch.component.css']
})
export class CustomerFetchComponent {
  us: user;

  constructor() {}

  ngOnInit(): void {
    this.us={
      primaryEmailAddress:'sg@gmail.com',
      userName: 'string',
      primaryMobileNumber:'9564961878',
      "registrationInfo": {}
    }


  }

}
