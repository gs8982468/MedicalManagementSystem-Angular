import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  isVerificationCodeSent: boolean= false;
  isSubmitted: boolean= false;
  userRegistration!: UserRegistration;//= new UserRegistration();
  userRegistrationResponse: UserRegistrationResponse= new UserRegistrationResponse();

  constructor(private userService: UserService, private router: Router) {}


  // registerUserFormGroup!:FormGroup;
  registerUserFormGroup= new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    userName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)]) ),
    emailAddress: new FormControl('',Validators.compose([Validators.required, Validators.email]) ),
    phoneCode: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(2)]) ),
    mobileNumber: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
    verificationCode: new FormControl('')
  });


  ngOnInit(): void {
    

  }

  onSubmit(){
    console.log("Entering into onSubmit method ");
    console.log(this.registerUserFormGroup.controls['firstName']?.value?.toString());
    this.createRegisterUserRequest();

    console.log(this.userRegistration);
    this.isVerificationCodeSent= true;
    this.isSubmitted= true;
    // this.userRegistrationResponse =  this.registerUser();
    // this.router.navigate(['/home']);
  }

  private createRegisterUserRequest() {
    this.userRegistration = {
      firstName: this.registerUserFormGroup.controls['firstName']?.value?.toString(),
      lastName: this.registerUserFormGroup.controls['lastName']?.value?.toString(),
      userName: this.registerUserFormGroup.controls['userName']?.value?.toString(),
      emailAddress: this.registerUserFormGroup.controls['emailAddress']?.value?.toString(),
      phoneCode: this.registerUserFormGroup.controls['phoneCode']?.value?.toString(),
      mobileNumber: this.registerUserFormGroup.controls['mobileNumber']?.value?.toString(),
      password: this.registerUserFormGroup.controls['password']?.value?.toString(),
      confirmPassword: this.registerUserFormGroup.controls['confirmPassword']?.value?.toString()
    };
  }

  onCancel(action: string){
    this.isVerificationCodeSent= false;
    
    console.log("Hi I am in onCancel method");
    if(action ==='cancelFromVerify'){
      this.isSubmitted= false;
      this.router.navigate(['/registration']);
    }else if(action === 'cancelFromRegister'){
      this.router.navigate(['/home']);
    }

  }

  registerUser(): any{
    this.userService.registerUser(this.userRegistration).subscribe(data=>
      {
        console.log("Line no 42: (registerUser method)", data);
        // console.log(ata);
        this.userRegistrationResponse=data;
        return this.userRegistrationResponse;
      }, error=> {
        console.warn(error);
        alert(error);
      }
        
      );
  }

  onVerificationCodeSubmit(){
    console.log("Verification completed");
    console.log(this.registerUserFormGroup.controls['verificationCode']?.value?.toString())
    this.router.navigate(['/home']);
  }

  get checkValidation(){
    return this.registerUserFormGroup.controls;
  }

}
