import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'http://localhost:32770/api/contacts';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  // Get all contacts
  getAllContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.apiUrl}/getallcontacts`)
      .pipe(
        catchError(this.handleError<Contact[]>('getAllContacts', []))
      );
  }

  // Get contact by ID
  getContactById(id: number): Observable<Contact> {
    const url = `${this.apiUrl}/getcontactbyid/${id}`;
    return this.http.get<Contact>(url)
      .pipe(
        catchError(this.handleError<Contact>(`getContactById with ID=${id}`))
      );
  }

  // Save a new contact
  saveContact(contact: Contact): Observable<Contact> {
    const url = `${this.apiUrl}/createcontact`;
    return this.http.post<Contact>(url, contact, this.httpOptions)
      .pipe(
        catchError(this.handleError<Contact>('saveContact'))
      );
  }

  // Update contact by ID
  updateContact(id: number, contact: Contact): Observable<Contact> {
    const url = `${this.apiUrl}/updatecontact/${id}`;
    return this.http.put<Contact>(url, contact, this.httpOptions)
      .pipe(
        catchError(this.handleError<Contact>('updateContact'))
      );
  }

  // Handle HTTP operation that failed.
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}