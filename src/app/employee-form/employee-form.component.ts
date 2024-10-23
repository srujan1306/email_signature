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
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
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
  // onFileChange(event: Event) {
  //   const input = event.target as HTMLInputElement;
  //   if (input.files && input.files.length > 0) {
  //     this.selectedFile = input.files[0];
  //   }
  // }
  imageUrl: string = 'http://i.pravatar.cc/500?img=7'; // Default image

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
