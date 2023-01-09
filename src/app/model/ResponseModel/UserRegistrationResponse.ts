import { ErrorResponseMessages } from "./ErrorResponseMessages";

export class UserRegistrationResponse {
    registrationStatus?: string;

    emailSentWithLoginDetails?:boolean;

    createdDate?: string;

    registrationSuccessful?: string;

    errorResponseMessages?: ErrorResponseMessages[];
}