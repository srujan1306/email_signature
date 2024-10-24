import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { EmailSignatureComponent } from './email-signature/email-signature.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    EmailSignatureComponent,
    RouterLink,
    EmployeeFormComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'email_signature';
}
