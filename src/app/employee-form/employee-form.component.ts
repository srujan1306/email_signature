import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss',
})
export class EmployeeFormComponent {
  employeeForm: FormGroup;
  constructor(private fb: FormBuilder, httpClient: HttpClient) {
    this.employeeForm = this.fb.group({
      name: [''],
      designation: [''],
      email: [''],
      phone_number: [''],
      image_url: [''],
      linkedIn_url: [''],
    });
  }
  createSignature() {
    const employee_details = this.employeeForm.value;
    // this.downloadTemplate(employee_details);
  }
  // downloadTemplate(userDetails: any) {
  //   // Load the HTML template
  //   this.http
  //     .get('assets/email-signature.html', { responseType: 'text' })
  //     .subscribe((signatureHtml: string) => {
  //       // Replace placeholders with actual user details
  //       const populatedSignatureHtml = signatureHtml
  //         .replace('{{name}}', userDetails.name)
  //         .replace('{{email}}', userDetails.email);

  //       const htmlContent = `
  //         <html>
  //           <head>
  //             <title>User Details</title>
  //             <link rel="stylesheet" href="path/to/your/styles.css">
  //             <script src="path/to/your/script.js"></script>
  //           </head>
  //           <body>
  //             <h1>User Details</h1>
  //             <p><strong>Name:</strong> ${userDetails.name}</p>
  //             <p><strong>Email:</strong> ${userDetails.email}</p>
  //             <img src="path/to/your/image.png" alt="User Image">
  //             ${populatedSignatureHtml} <!-- Include the email signature here -->
  //           </body>
  //         </html>
  //       `;

  //       const blob = new Blob([htmlContent], { type: 'text/html' });
  //       const url = window.URL.createObjectURL(blob);

  //       const a = document.createElement('a');
  //       a.href = url;
  //       a.download = 'user-details.html';
  //       document.body.appendChild(a);
  //       a.click();
  //       document.body.removeChild(a);
  //       window.URL.revokeObjectURL(url);
  //     });
  // }
}
