import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { EmployeeDetailsService } from '../employee-details.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss',
})
export class EmployeeFormComponent {
  employeeForm: FormGroup;
  formData = new FormData();
  selectedFile: File | null = null;
  imageUrl: string = 'http://i.pravatar.cc/500?img=7'; // Default image
  isLoading: boolean = false;
  countryCodes: any[] = [];
  selectedCountryCode: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private EmployeeDetailsService: EmployeeDetailsService
  ) {
    this.employeeForm = this.fb.group({
      full_name: ['', [Validators.required, Validators.minLength(2)]],
      designation: ['', [Validators.required, Validators.minLength(2)]],
      email_address: ['', [Validators.required, Validators.email]],
      phone_number: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      country_code: ['', [Validators.required]],
      file: [''],
      facebook_link: [''],
      linkedIn_link: [''],
      twitter_link: [''],
      instagram_link: [''],
    });
  }

  ngOnInit() {
    this.loadCountryCodes();
  }

  loadCountryCodes() {
    this.http.get<any[]>('CountryCodes.json').subscribe((data) => {
      this.countryCodes = data;
    });
  }
  createSignature() {
    this.isLoading = true;
    const phoneNumber = this.employeeForm.get('phone_number')?.value;
    const countryCode = this.employeeForm.get('country_code')?.value;
    const fullPhoneNumber = `${countryCode}${phoneNumber}`;
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
    this.formData.append('phone_number', fullPhoneNumber);
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
    this.EmployeeDetailsService.generate_email_signature(this.formData).then(
      () => {
        this.isLoading = false;
      }
    );
  }
  errorMessage: string | null = null;
  maxFileSize: number = 5 * 1024 * 1024;
  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      this.errorMessage = null;

      const validTypes = ['image/png', 'image/jpg', 'image/jpeg'];
      if (!validTypes.includes(file.type)) {
        this.errorMessage = 'Please upload a valid image (.png, .jpg, .jpeg).';
        return;
      }

      if (file.size > this.maxFileSize) {
        this.errorMessage = 'File size must be less than 5 MB.';
        return;
      }

      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageUrl = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  get full_name() {
    return this.employeeForm.get('full_name');
  }
  get designation() {
    return this.employeeForm.get('designation');
  }
  get phone_number() {
    return this.employeeForm.get('phone_number');
  }
  get email_address() {
    return this.employeeForm.get('email_address');
  }
  get facebook_link() {
    return this.employeeForm.get('facebook_link');
  }
  get linkedIn_link() {
    return this.employeeForm.get('linkedIn_link');
  }
  get twitter_link() {
    return this.employeeForm.get('twitter_link');
  }
  get instagram_link() {
    return this.employeeForm.get('instagram_link');
  }
}
