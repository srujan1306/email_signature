import { Component, OnInit } from '@angular/core';
import { EmployeeDetailsService } from '../employee-details.service';

@Component({
  selector: 'app-email-signature',
  standalone: true,
  imports: [],
  templateUrl: './email-signature.component.html',
  styleUrl: './email-signature.component.scss',
})
export class EmailSignatureComponent implements OnInit {
  formData = new FormData();
  employee_details: any = {};

  constructor(private EmployeeDetailsService: EmployeeDetailsService) {}

  ngOnInit() {
    this.formData = this.EmployeeDetailsService.getFormData();
    this.formData.forEach((value, key) => {
      this.employee_details[key] = value;
    });

    console.log(this.employee_details); // Check the extracted details
  }
  downloadSignature() {
    const content = `
      <html>
       <head>
        <style>
.main_container {
  position: relative;
  font-family: "Inter", sans-serif;
  display: flex;
  align-items: center;
  height: 158px;
  width: 520px;
  background: url("https://procstatemailsigassets.s3.ap-south-1.amazonaws.com/background.png");
  background-repeat: no-repeat;
  background-size: contain;
}
.image_container {
  margin-left: 10px;
  height: 135px;
  width: 135px;
  img {
    height: 100%;
    width: 100%;
    border-radius: 20px;
    border: solid 2.5px #98ca3e;
  }
}
.employee_details_container {
  margin-left: 14px;
  height: 100%;
  width: 240px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .name {
    font-size: 20px;
    margin: 0px;
    color: white;
    padding-top: 15px;
  }
  .role {
    font-size: 14px;
    margin: 0px;
    color: #98ca3e;
  }
}
.name_role_container {
  display: flex;
  flex-direction: column;
}
.contact_details {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 20px;
  gap: 16px;
  padding-bottom: 18px;
  a {
    position: relative;
  }
  a:hover .tooltip {
    visibility: visible;
    opacity: 1;
  }
}
.call {
  height: 15px;
  width: 15px;
  background-image: url("https://procstatemailsigassets.s3.ap-south-1.amazonaws.com/call.png");
  background-repeat: no-repeat;
  background-size: contain;
}
.mail {
  height: 15px;
  width: 20px;
  background-image: url("https://procstatemailsigassets.s3.ap-south-1.amazonaws.com/mail.png");
  background-repeat: no-repeat;
  background-size: contain;
}

.procstat_info {
  right: 10px;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 20%;
  justify-content: space-between;
}
.social_media {
  margin: 8px 0px;
  width: 100%;
  height: 20px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 8px;
  a {
    position: relative;
  }
  a:hover .tooltip {
    visibility: visible;
    opacity: 1;
  }
}

.procstat {
  position: absolute;
  height: 50px;
  width: 18%;
  background: url("https://procstatemailsigassets.s3.ap-south-1.amazonaws.com/procstat_logo.png");
  background-repeat: no-repeat;
  background-size: contain;
  right: 115px;
  bottom: 6px;
}
.proclink_venture {
  position: absolute;
  right: 24px;
  bottom: 24px;
  height: 10px;
  width: 16%;
  background: url("https://procstatemailsigassets.s3.ap-south-1.amazonaws.com/_A_Proclink_Venture.png");
  background-repeat: no-repeat;
  background-size: contain;
}

.social-icon {
  display: inline-block;
  width: 18px;
  height: auto;
  background-size: 100%;
  background-repeat: no-repeat;
  transition: transform 0.2s;
}

.facebook {
  background-image: url("https://procstatemailsigassets.s3.ap-south-1.amazonaws.com/facebook.svg");
}

.linkedIn {
  background-image: url("https://procstatemailsigassets.s3.ap-south-1.amazonaws.com/linkedIn.svg");
}

.twitter {
  background-image: url("https://procstatemailsigassets.s3.ap-south-1.amazonaws.com/twitter.svg");
}

.instagram {
  background-image: url("https://procstatemailsigassets.s3.ap-south-1.amazonaws.com/instagram.svg");
}
.social-icon:hover {
  transform: scale(1.1);
}
.tooltip {
  font-size: 12px;
  visibility: hidden;
  width: fit-content;
  background-color: #333;
  color: #fff;
  text-align: center;
  border-radius: 5px;
  padding: 5px;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -60px;
  opacity: 0;
  transition: opacity 0.3s;
}

        </style>
      </head>
        <body>
          <div class="main_container">
  <div class="image_container">
    <img src="${this.employee_details.profile_imageUrl}" alt="Profile Picture" />
  </div>
  <div class="employee_details_container">
    <div class="name_role_container">
      <p class="name">${this.employee_details.full_name}</p>
      <p class="role">${this.employee_details.designation}</p>
    </div>
    <div class="contact_details">
      <a href="tel:${this.employee_details.phone_number}">
        <div class="call"></div>
        <span class="tooltip">${this.employee_details.phone_number}</span>
      </a>
      <a href="mailto:${this.employee_details.email_address}">
        <div class="mail"></div>
        <span class="tooltip">${this.employee_details.email_address}</span>
      </a>
    </div>
  </div>
  <div class="procstat_info">
    <div class="social_media">
      <a
        href="${this.employee_details.facebook_link}"
        target="_blank"
        class="social-icon facebook"
      >
        <span class="tooltip">${this.employee_details.facebook_link}</span>
      </a>
      <a
        href="${this.employee_details.linkedIn_link}"
        target="_blank"
        class="social-icon linkedIn"
      >
        <span class="tooltip">${this.employee_details.linkedIn_link}</span>
      </a>
      <a
        href="${this.employee_details.twitter_link}"
        target="_blank"
        class="social-icon twitter"
      >
        <span class="tooltip">${this.employee_details.twitter_link}</span>
      </a>
      <a
        href="${this.employee_details.instagram_link}"
        target="_blank"
        class="social-icon instagram"
      >
        <span class="tooltip">${this.employee_details.instagram_link}</span>
      </a>
    </div>
  </div>
  <div class="procstat"></div>
  <div class="proclink_venture"></div>
</div>
        </body>
      </html>
    `;

    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${this.employee_details.full_name}_ES.html`; // Specify the name of the file
    a.click();
    URL.revokeObjectURL(url); // Clean up the URL.createObjectURL
  }
}
