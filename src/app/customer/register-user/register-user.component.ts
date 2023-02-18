import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { OTPManagerResponse } from 'src/app/model/ResponseModel/OTPManagerResponse';
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
  show: boolean = false;
  isVerificationCodeSent: boolean= false;
  isSubmitted: boolean= false;
  isRegistrationSuccessful: boolean = false;

  errorList: any = [];

  userRegistration!: UserRegistration;//= new UserRegistration();
  userRegistrationResponse: UserRegistrationResponse= new UserRegistrationResponse();
  otpManagerResponse: OTPManagerResponse= new OTPManagerResponse();

  constructor(private userService: UserService, 
    private router: Router
    // private sprinner : NgxSpinnerService
    )
     {}

     password() {
      this.show = !this.show;
      }

  // registerUserFormGroup!:FormGroup;
  personalDataFormGroup= new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    userName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)]) ),
    emailAddress: new FormControl('',Validators.compose([Validators.required, Validators.email]) ),
    phoneCode: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(3)]) ),
    mobileNumber: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required)
  });
  otpFormGroup= new FormGroup({
    verificationCode: new FormControl('', Validators.required)
  })


  ngOnInit(): void {
    // this.sprinner.show()

  }

  sendVerificationCode(){
    // this.sprinner.show()
    console.log("Entering into onSubmit method ");
    console.log(this.personalDataFormGroup.controls['firstName']?.value?.toString());
    this.createSendOtpRequest();
    console.log(this.userRegistration);
    this.otpManagerResponse =  this.sendVerification();
  }

  onSubmit(){
    // this.sprinner.show()
    console.log("Entering into onSubmit method ");
    console.log(this.personalDataFormGroup.controls['firstName']?.value?.toString());
    this.createSendOtpRequest();

    console.log(this.userRegistration);
    this.isVerificationCodeSent= true;
    this.isSubmitted= true;
    this.createRegisterRequest();
    this.userRegistrationResponse =  this.registerUser();
    // this.router.navigate(['/home']);
  }

  private createSendOtpRequest() {
    this.userRegistration = {
      firstName: this.personalDataFormGroup.controls['firstName']?.value?.toString(),
      lastName: this.personalDataFormGroup.controls['lastName']?.value?.toString(),
      userName: this.personalDataFormGroup.controls['userName']?.value?.toString(),
      emailAddress: this.personalDataFormGroup.controls['emailAddress']?.value?.toString(),
      phoneCode: this.personalDataFormGroup.controls['phoneCode']?.value?.toString(),
      mobileNumber: this.personalDataFormGroup.controls['mobileNumber']?.value?.toString(),
      password: this.personalDataFormGroup.controls['password']?.value?.toString(),
      confirmPassword: this.personalDataFormGroup.controls['confirmPassword']?.value?.toString(),
      // verificationCode: this.otpFormGroup.controls['verificationCode']?.value?.toString()
    };
  }

  private createRegisterRequest() {
    this.userRegistration = {
      firstName: this.personalDataFormGroup.controls['firstName']?.value?.toString(),
      lastName: this.personalDataFormGroup.controls['lastName']?.value?.toString(),
      userName: this.personalDataFormGroup.controls['userName']?.value?.toString(),
      emailAddress: this.personalDataFormGroup.controls['emailAddress']?.value?.toString(),
      phoneCode: this.personalDataFormGroup.controls['phoneCode']?.value?.toString(),
      mobileNumber: this.personalDataFormGroup.controls['mobileNumber']?.value?.toString(),
      password: this.personalDataFormGroup.controls['password']?.value?.toString(),
      confirmPassword: this.personalDataFormGroup.controls['confirmPassword']?.value?.toString(),
      verificationCode: this.otpFormGroup.controls['verificationCode']?.value?.toString()
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
    // this.sprinner.show()
    this.isVerificationCodeSent= false;
    this.isRegistrationSuccessful= false;
    this.isSubmitted= false;
    this.personalDataFormGroup.reset();
    this.router.navigate(['/registration']);
  }

  registerUser(): any{
    this.userService.registerUser(this.userRegistration).subscribe(data=>
      {
        console.log("Line no 42: (registerUser method)", data);
        // console.log(ata);
        this.userRegistrationResponse=data;
        if(this.userRegistrationResponse.otpMatched===false){
          Swal.fire("Wrong OTP entered");
        } else{
          if(this.userRegistrationResponse.registrationStatus==='SUCCESS'){
            Swal.fire("Registration successful");
            this.personalDataFormGroup.reset();
            this.otpFormGroup.reset();
            this.enableTextBox();
            this.isRegistrationSuccessful= true;
            this.isVerificationCodeSent= false;
          } else{
            Swal.fire("Registration failed");
          }
        }
        

        

        
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
        this.otpManagerResponse=data;
        this.errorList= this.otpManagerResponse.errorResponseMessages;
                
        // if(this.otpManagerResponse.errorResponseMessages?.length === 0){
          if(this.otpManagerResponse.mailSentWithOTP===true){
            this.isVerificationCodeSent= true;
            this.disabledTextBoxOnSendOtpButtonClick();
            Swal.fire("OTP send to : ", this.userRegistration.emailAddress);
          } else{
            Swal.fire("OTP send failed");
          }
        // } else{
        //   this.errorList= this.otpManagerResponse.errorResponseMessages;
        //   // Swal.fire("the following error occurred: ", data.errorResponseMessages[0]?.errorMessage,
        //   // data.errorResponseMessages[1]?.errorMessage);
        // }
        
        // Swal.fire("OTP send to : ", this.userRegistration.emailAddress);
        return this.otpManagerResponse;
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

  private disabledTextBoxOnSendOtpButtonClick() {
    this.personalDataFormGroup.get('firstName')?.disable();
    this.personalDataFormGroup.get('lastName')?.disable();
    this.personalDataFormGroup.get('userName')?.disable();
    this.personalDataFormGroup.get('emailAddress')?.disable();
    this.personalDataFormGroup.get('phoneCode')?.disable();
    this.personalDataFormGroup.get('mobileNumber')?.disable();
    this.personalDataFormGroup.get('password')?.disable();
    this.personalDataFormGroup.get('confirmPassword')?.disable();
  }

  enableTextBox(){
    this.personalDataFormGroup.get('firstName')?.enable();
    this.personalDataFormGroup.get('lastName')?.enable();
    this.personalDataFormGroup.get('userName')?.enable();
    this.personalDataFormGroup.get('emailAddress')?.enable();
    this.personalDataFormGroup.get('phoneCode')?.enable();
    this.personalDataFormGroup.get('mobileNumber')?.enable();
    this.personalDataFormGroup.get('password')?.enable();
    this.personalDataFormGroup.get('confirmPassword')?.enable();
    this.isVerificationCodeSent= false;
  }

  onVerificationCodeSubmit(){
    console.log("Verification completed");
    console.log(this.otpFormGroup.controls['verificationCode']?.value?.toString())
    this.router.navigate(['/home']);
  }

  get checkValidation(){
    return this.personalDataFormGroup.controls;
  }

  onClickRegistrationPage(){
    this.router.navigate(['/login']);
  }

  onClickHomeButton(){
    this.router.navigate(['/home']);
  }
}
