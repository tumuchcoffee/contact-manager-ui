import { Routes } from '@angular/router';
import { ContactList } from './list';

export default [
    { path: 'list', data: { breadcrumb: 'Contacts' }, component: ContactList },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
