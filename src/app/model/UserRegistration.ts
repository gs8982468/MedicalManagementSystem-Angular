export class UserRegistration {
    firstName?: string;

    lastName?:string;

    userName?: string;

    emailAddress?: string;

    phoneCode?: string;

    mobileNumber?: string;

    password?: string;
    
    confirmPassword?: string;

    verificationCode?: string;
    
    constructor(firstName: string,lastName: string,userName: string,emailAddress: string,
         phoneCode: string, mobileNumber: string,password: string,confirmPassword: string, verificationCode: string  ){
        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = userName;
        this.emailAddress = emailAddress;
        this.phoneCode = phoneCode;
        this.mobileNumber = mobileNumber;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.verificationCode = verificationCode;
    }

}
