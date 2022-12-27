import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl="http://localhost:80/internal/mms-portal/medicalManagementSystem/v1/customer/fetchUser/gs8982468";

  constructor(private httpClient:HttpClient) { }

  // getUser():Observable<User>{
  //   return this.httpClient.get<User>(`${this.baseUrl}`);
  // }

  getUser(){
    return this.httpClient.get(`${this.baseUrl}`);
  }
}
