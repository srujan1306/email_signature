import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmailSignatureComponent } from './email-signature/email-signature.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, EmailSignatureComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'email_signature';
}
