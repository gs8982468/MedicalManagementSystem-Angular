export class user {
    userName?: string;
    primaryMobileNumber?:string;
    primaryEmailAddress?: string;
    registrationInfo?: registrationInfo;
}


export class registrationInfo{
    emailAddress?: string;
    mobileNumber?: string;
    password?: string;
    registrationDate?: string;
    userName?: string
}
