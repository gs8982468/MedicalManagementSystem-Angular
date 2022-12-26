import { LoginData } from "./LoginData";
import { PersonalDetails } from "./PersonalDetails";
import { RegistrationInfo } from "./RegistrationInfo";

export class User {
    userName?: string;

    primaryMobileNumber?:string;

    primaryEmailAddress?: string;

    isUserNameChanged?: boolean;

    loginData?: LoginData;

    registrationInfo?: RegistrationInfo;

    personalDetails?: PersonalDetails;
    
    isUsersAllDetailsSaved?: boolean;
}
