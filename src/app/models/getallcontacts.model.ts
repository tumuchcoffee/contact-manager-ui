import { Contact } from './contact.model';

export interface GetAllResponse {
    result: Contact[];
    exception: string;
    hasError: boolean;
}