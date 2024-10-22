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
import { EmployeeDetailsService } from '../employee-details.service';
import { Router } from '@angular/router';
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
  formData = new FormData();
  selectedFile: File | null = null;
  constructor(
    private fb: FormBuilder,
    httpClient: HttpClient,
    private router: Router,
    private EmployeeDetailsService: EmployeeDetailsService
  ) {
    this.employeeForm = this.fb.group({
      full_name: [''],
      designation: [''],
      email_address: [''],
      phone_number: [''],
      file: [''],
      facebook_link: [''],
      linkedIn_link: [''],
      twitter_link: [''],
      instagram_link: [''],
    });
  }
  createSignature() {
    this.formData.append(
      'full_name',
      this.employeeForm.get('full_name')?.value
    );
    this.formData.append(
      'designation',
      this.employeeForm.get('designation')?.value
    );
    this.formData.append(
      'email_address',
      this.employeeForm.get('email_address')?.value
    );
    this.formData.append(
      'phone_number',
      this.employeeForm.get('phone_number')?.value
    );
    this.formData.append(
      'facebook_link',
      this.employeeForm.get('facebook_link')?.value
    );
    this.formData.append(
      'linkedIn_link',
      this.employeeForm.get('linkedIn_link')?.value
    );
    this.formData.append(
      'twitter_link',
      this.employeeForm.get('twitter_link')?.value
    );
    this.formData.append(
      'instagram_link',
      this.employeeForm.get('instagram_link')?.value
    );
    if (this.selectedFile) {
      this.formData.append('file', this.selectedFile);
    }
    this.EmployeeDetailsService.generate_email_signature(this.formData);
  }
  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
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
