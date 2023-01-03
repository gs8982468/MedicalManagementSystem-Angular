import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/User';
import { Observable } from 'rxjs';
import { UserRegistration } from '../model/UserRegistration';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl="http://localhost:80/internal/mms-portal/medicalManagementSystem/v1/customer/fetchUser/gs8982468";
  private registerUrl= "http://localhost:80/internal/mms-portal/medicalManagementSystem/v1/customer/registration";

  constructor(private httpClient:HttpClient) { }

  // getUser():Observable<User>{
  //   return this.httpClient.get<User>(`${this.baseUrl}`);
  // }

  getUser(){
    return this.httpClient.get(`${this.baseUrl}`);
  }

  registerUser(userRegistration: UserRegistration): Observable<any>{
    return this.httpClient.post(`${this.registerUrl}`, userRegistration)
  }
}
