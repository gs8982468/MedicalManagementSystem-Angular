import { ErrorResponseMessages } from "./ErrorResponseMessages";

export class OTPManagerResponse {
    mailSentWithOTP?:boolean;

    mailSentTime?: string;

    errorResponseMessages?: ErrorResponseMessages[];
}