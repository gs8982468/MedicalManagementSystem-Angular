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
  showRegisterButton: boolean= false;
  isSubmitted: boolean= false;
  isRegistrationSuccessful: boolean = false;

  constructor(private userService: UserService, 
    private router: Router
    )
     {}

     password() {
      this.show = !this.show;
      }
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
  otpFormGroup= new FormGroup({verificationCode: new FormControl('', Validators.required)})


  ngOnInit(): void {
  }



  onClickRegister(){
    let otpVerificationRequest:UserRegistration= new UserRegistration();
    let userRegistrationResponse: UserRegistrationResponse= new UserRegistrationResponse();
    this.createCommonRequestForSubmitAndSendOTP(otpVerificationRequest, true);
    this.registerUser(otpVerificationRequest);
  }

  registerUser(otpVerificationRequest: UserRegistration){
    this.userService.registerUser(otpVerificationRequest).subscribe(data=>
      {
        this.processRegisterUserResponse(data);
      }, error=> {
        console.warn(error);
        Swal.fire('This is a simple and sweet alert')
      }
        
      );
  }

  private processRegisterUserResponse(userRegistrationResponse: UserRegistrationResponse) {
    if (userRegistrationResponse.errorResponseMessages?.length === 0 && userRegistrationResponse.registrationStatus === 'SUCCESS') {
      this.processSuccessRegisterResponse();
    } else {
      this.processFailedRegisterResponse(userRegistrationResponse);
    }
  }

  private processSuccessRegisterResponse() {
    Swal.fire("Registration successful");
    this.personalDataFormGroup.reset();
    this.otpFormGroup.reset();
    this.enableTextBoxOnClickEditEntry();
    this.showRegisterButton = false;
    this.isRegistrationSuccessful = true;
  }

  private processFailedRegisterResponse(userRegistrationResponse: UserRegistrationResponse) {
    let errorMessage: string = '';
    let errorList: any = [];
    errorList = userRegistrationResponse.errorResponseMessages;
    for (let error of errorList) {
      errorMessage = errorMessage + error.errorMessage + '<br/>' + '<br/>';
    }
    Swal.fire("Registration failed due to following reason: \n", errorMessage);
  }

  private createCommonRequestForSubmitAndSendOTP(commonRequest: UserRegistration, onVerificationCodeSend: boolean) {
    commonRequest.firstName= this.personalDataFormGroup.controls['firstName']?.value?.toString();
    commonRequest.lastName= this.personalDataFormGroup.controls['lastName']?.value?.toString();
    commonRequest.userName= this.personalDataFormGroup.controls['userName']?.value?.toString();
    commonRequest.emailAddress= this.personalDataFormGroup.controls['emailAddress']?.value?.toString();
    commonRequest.phoneCode= this.personalDataFormGroup.controls['phoneCode']?.value?.toString();
    commonRequest.mobileNumber= this.personalDataFormGroup.controls['mobileNumber']?.value?.toString();
    commonRequest.password= this.personalDataFormGroup.controls['password']?.value?.toString();
    commonRequest.confirmPassword= this.personalDataFormGroup.controls['confirmPassword']?.value?.toString();
    if(onVerificationCodeSend===true){
      commonRequest.verificationCode= this.otpFormGroup.controls['verificationCode']?.value?.toString()
    }
  }

  onClickSendOtp() {
    let otpManagerResponse: OTPManagerResponse = new OTPManagerResponse();
    let otpVerificationRequest: UserRegistration = new UserRegistration();
    this.createCommonRequestForSubmitAndSendOTP(otpVerificationRequest, false);
    this.callSendVerification(otpVerificationRequest);
  }

  callSendVerification(otpVerificationRequest: UserRegistration){
    this.userService.sendVerification(otpVerificationRequest).subscribe(data => {
      this.processSendOtpResponse(data, otpVerificationRequest);
    }, error => {
      console.warn(error.message);
      Swal.fire('oops...', 'Something went wrong in the server', 'error');
    }
    );
  }

  private processSendOtpResponse(otpManagerResponse: OTPManagerResponse, otpVerificationRequest: UserRegistration) {
    if (null !== otpManagerResponse.errorResponseMessages && otpManagerResponse.errorResponseMessages?.length === 0) {
      this.processSuccessfulSendOtpResponse(otpManagerResponse, otpVerificationRequest);
    } else {
      this.processFailedSendOtpResponse(otpManagerResponse);
    }
  }

  private processSuccessfulSendOtpResponse(otpManagerResponse: OTPManagerResponse, otpVerificationRequest: UserRegistration) {
    console.log("line 167: onCLickSendOtp");
    this.showRegisterButton = otpManagerResponse.mailSentWithOTP;
    console.log("ShowButton: ", this.showRegisterButton);
    this.disabledTextBoxOnSendOtpButtonClick();
    Swal.fire("OTP send to : \n", otpVerificationRequest.emailAddress);
  }

  private processFailedSendOtpResponse(otpManagerResponse: OTPManagerResponse) {
    let errorMessage: string = '';
    let errorList: any = [];
    errorList = otpManagerResponse.errorResponseMessages;
    for (let error of errorList) {
      errorMessage = errorMessage + error.errorMessage + '<br/>' + '<br/>';
    }
    Swal.fire("Please check the following error: \n", errorMessage);
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

  enableTextBoxOnClickEditEntry(){
    this.personalDataFormGroup.get('firstName')?.enable();
    this.personalDataFormGroup.get('lastName')?.enable();
    this.personalDataFormGroup.get('userName')?.enable();
    this.personalDataFormGroup.get('emailAddress')?.enable();
    this.personalDataFormGroup.get('phoneCode')?.enable();
    this.personalDataFormGroup.get('mobileNumber')?.enable();
    this.personalDataFormGroup.get('password')?.enable();
    this.personalDataFormGroup.get('confirmPassword')?.enable();
    this.showRegisterButton= false;
   
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
