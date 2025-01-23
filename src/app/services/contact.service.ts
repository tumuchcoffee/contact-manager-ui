import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Contact } from '../models/contact.model';
import { GetAllResponse } from '../models/getallcontacts.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'https://localhost:44309/api/contacts';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  // Get all contacts
  getAllContacts(): Observable<GetAllResponse> {
    return this.http.get<GetAllResponse>(`${this.apiUrl}/getallcontacts`)
      .pipe(
        catchError(error => this.handleError<GetAllResponse>('getAllContacts', error))
      );
  }

  // Get contact by ID
  getContactById(id: number): Observable<Contact> {
    const url = `${this.apiUrl}/getcontactbyid/${id}`;
    return this.http.get<Contact>(url)
      .pipe(catchError(error => this.handleError<Contact>(`getContactById with ID=${id}`, error)));
  }

  // Save a new contact
  saveContact(contact: Contact): Observable<Contact> {
    const url = `${this.apiUrl}/createcontact`;
    return this.http.post<Contact>(url, contact, this.httpOptions)
      .pipe(catchError(error => this.handleError<Contact>('saveContact', error)));
  }

  // Update contact by ID
  updateContact(id: number, contact: Contact): Observable<Contact> {
    const url = `${this.apiUrl}/updatecontact/${id}`;
    return this.http.put<Contact>(url, contact, this.httpOptions)
      .pipe(catchError(error => this.handleError<Contact>('updateContact', error)));
  }

  // Handle HTTP operation that failed.
  private handleError<T>(operation = 'operation', error: any): Observable<T> {
    console.error(`${operation} failed: ${error.message}`);
    return of({} as T);
  }
}