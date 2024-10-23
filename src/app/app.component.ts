import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { EmailSignatureComponent } from './email-signature/email-signature.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, EmailSignatureComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'email_signature';
}
