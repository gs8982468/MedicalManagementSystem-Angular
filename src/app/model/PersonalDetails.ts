import { Address } from "./Address";
import { ContactDetails } from "./ContactDetails";

export class PersonalDetails{
    firstName?: string;

    lastName?: string;

    age?: number;

    dob?: string;

    address?: Address ;
    
    contactDetails?:  ContactDetails;

}