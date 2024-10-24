import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// const API = 'http://localhost:3000';
const API = 'https://email-signature-be-m3aq.onrender.com';
@Injectable({
  providedIn: 'root',
})
export class EmployeeDetailsService {
  new_formData = new FormData();
  private formData = new FormData();

  constructor(private router: Router) {}

  generate_email_signature(formData: FormData) {
    return fetch(`${API}/upload`, {
      method: 'POST',
      body: formData,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((responseData) => {
        this.new_formData.append(
          'profile_imageUrl',
          responseData.profile_imageUrl
        );
        this.new_formData.append('full_name', responseData.full_name);
        this.new_formData.append('designation', responseData.designation);
        this.new_formData.append('phone_number', responseData.phone_number);
        this.new_formData.append('email_address', responseData.email_address);
        this.new_formData.append('facebook_link', responseData.facebook_link);
        this.new_formData.append('linkedIn_link', responseData.linkedIn_link);
        this.new_formData.append('twitter_link', responseData.twitter_link);
        this.new_formData.append('instagram_link', responseData.instagram_link);

        this.setFormData(this.new_formData);
        this.router.navigate(['/email_signature']);
      })
      .catch((error) => {
        console.error('Error:', error);
        throw error;
      });
  }

  setFormData(data: FormData) {
    this.formData = data;
  }

  getFormData(): FormData {
    return this.formData;
  }
}
