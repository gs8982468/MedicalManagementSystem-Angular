import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserRegistrationResponse } from 'src/app/model/ResponseModel/UserRegistrationResponse';
import { UserRegistration } from 'src/app/model/UserRegistration';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit{
  isVerificationCodeSent: boolean= false;
  isSubmitted: boolean= false;
  isRegistrationSuccessful: boolean = false;
  userRegistration!: UserRegistration;//= new UserRegistration();
  userRegistrationResponse: UserRegistrationResponse= new UserRegistrationResponse();

  constructor(private userService: UserService, 
    private router: Router,
    private sprinner : NgxSpinnerService
    )
     {}


  // registerUserFormGroup!:FormGroup;
  registerUserFormGroup= new FormGroup({
    firstName: new FormControl('Test', Validators.required),
    lastName: new FormControl('Test', Validators.required),
    userName: new FormControl('test12', Validators.compose([Validators.required, Validators.minLength(6)]) ),
    emailAddress: new FormControl('test@test.com',Validators.compose([Validators.required, Validators.email]) ),
    phoneCode: new FormControl('91', Validators.compose([Validators.required, Validators.maxLength(2)]) ),
    mobileNumber: new FormControl('9564961878', Validators.required),
    password: new FormControl('9565', Validators.required),
    confirmPassword: new FormControl('9564', Validators.required),
    verificationCode: new FormControl('')
  });


  ngOnInit(): void {
    this.sprinner.show()

  }

  sendVerificationCode(){
    this.sprinner.show()
    console.log("Entering into onSubmit method ");
    console.log(this.registerUserFormGroup.controls['firstName']?.value?.toString());
    this.createRegisterUserRequest();
    console.log(this.userRegistration);
    this.userRegistrationResponse =  this.sendVerification();
  }

  onSubmit(){
    this.sprinner.show()
    console.log("Entering into onSubmit method ");
    console.log(this.registerUserFormGroup.controls['firstName']?.value?.toString());
    this.createRegisterUserRequest();

    console.log(this.userRegistration);
    this.isVerificationCodeSent= true;
    this.isSubmitted= true;
    this.userRegistrationResponse =  this.registerUser();
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
      confirmPassword: this.registerUserFormGroup.controls['confirmPassword']?.value?.toString(),
      verificationCode: this.registerUserFormGroup.controls['verificationCode']?.value?.toString()
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

  navigateToRegistrationPage(){
    this.sprinner.show()
    this.isVerificationCodeSent= false;
    this.isRegistrationSuccessful= false;
    this.isSubmitted= false;
    this.registerUserFormGroup.reset();
    this.router.navigate(['/registration']);
  }

  registerUser(): any{
    this.userService.registerUser(this.userRegistration).subscribe(data=>
      {
        console.log("Line no 42: (registerUser method)", data);
        // console.log(ata);
        this.userRegistrationResponse=data;
        this.isRegistrationSuccessful= true;
        this.isVerificationCodeSent= false;
        return this.userRegistrationResponse;
      }, error=> {
        console.warn(error);
        // alert("Something went wrong...\nIf it occurrs continously please send the screenshot of this page and send it to: gsubhankar2018@gmail.com");
        Swal.fire('This is a simple and sweet alert')
      }
        
      );
  }

  sendVerification(): any{
    this.userService.sendVerification(this.userRegistration).subscribe(data=>
      {
        console.log("Line no 109: (sendVerification method)", data);
        // console.log(ata);
        this.userRegistrationResponse=data;
        this.isVerificationCodeSent= true;
        return this.userRegistrationResponse;
      }, error=> {
        console.warn(error.message);
        // alert("Something went wrong...\nIf it occurrs continously please send the screenshot of this page and send it to: gsubhankar2018@gmail.com");
        // Swal.fire("Something went wrong...\nplease send the screenshot of this page to: gsubhankar2018@gmail.com");
        Swal.fire('oops...', 'Something went wrong', 'error');
        // Swal.fire({
        //   title: 'Ooops...\nSomething went wrong',
        //   showClass: {
        //     popup: 'animate__animated animate__fadeInDown'
        //   },
        //   hideClass: {
        //     popup: 'animate__animated animate__fadeOutUp'
        //   }
        // })
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
