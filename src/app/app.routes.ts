import { Routes } from '@angular/router';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmailSignatureComponent } from './email-signature/email-signature.component';

export const routes: Routes = [
  {
    path: 'form',
    component: EmployeeFormComponent,
  },
  {
    path: 'email_signature',
    component: EmailSignatureComponent,
  },
];
