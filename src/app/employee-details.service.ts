import { Injectable } from '@angular/core';
import { Form } from '@angular/forms';
import { Router } from '@angular/router';
const API = 'http://localhost:3000';
@Injectable({
  providedIn: 'root',
})
export class EmployeeDetailsService {
  new_formData = new FormData();
  constructor(private router: Router) {}
  generate_email_signature(formData: FormData) {
    this.new_formData = formData;
    return fetch(`${API}/upload`, {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then(() => this.router.navigate(['/email_signature']))
      .catch((error) => {
        console.error('Error:', error);
        throw error; // Rethrow error to handle it in the component if needed
      });
  }
}
