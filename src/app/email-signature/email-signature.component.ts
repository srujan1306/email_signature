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
  // border: solid 2.5px #98ca3e;
  // border-radius: 20px;
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
  width: 19%;
  justify-content: space-between;
}
.social_media {
  margin: 8px 0px;
  width: 100%;
  height: 20px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding-right: 10px;
}

.facebook {
  margin: 0px 4px;
  height: auto;
  width: 16px;
  background-image: url("https://procstatemailsigassets.s3.ap-south-1.amazonaws.com/facebook.svg");
  background-repeat: no-repeat;
  background-size: contain;
}
.linkedIn {
  margin: 0px 4px;
  height: auto;
  width: 17px;
  background-image: url("https://procstatemailsigassets.s3.ap-south-1.amazonaws.com/linkedIn.svg");
  background-repeat: no-repeat;
  background-size: contain;
}
.twitter {
  margin: 0px 4px;
  height: auto;
  width: 16px;
  background-image: url("https://procstatemailsigassets.s3.ap-south-1.amazonaws.com/twitter.svg");
  background-repeat: no-repeat;
  background-size: contain;
}
.instagram {
  margin: 0px 4px;
  height: auto;
  width: 16px;
  background-image: url("https://procstatemailsigassets.s3.ap-south-1.amazonaws.com/instagram.svg");
  background-repeat: no-repeat;
  background-size: contain;
}
// .procstat_logo {
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   height: 40px;
//   width: 200px;
// }

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

        </style>
      </head>
        <body>
          <div class="main_container">
  <div class="image_container">
    <img src="${this.employee_details.profile_imageUrl}" alt="profile picture" />
  </div>
  <div class="employee_details_container">
    <div class="name_role_container">
      <p class="name">${this.employee_details.full_name}</p>
      <p class="role">${this.employee_details.designation}</p>
    </div>
    <div class="contact_details">
      <a href="tel:+91${this.employee_details.phone_number}">
        <div class="call"></div
      ></a>
      <a href="mailto:${this.employee_details.email_address}">
        <div class="mail"></div>
      </a>
    </div>
  </div>
  <div class="procstat_info">
    <div class="social_media">
      <div class="facebook"></div>
      <div class="linkedIn"></div>
      <div class="twitter"></div>
      <div class="instagram"></div>
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
    a.download = 'email_signature.html'; // Specify the name of the file
    a.click();
    URL.revokeObjectURL(url); // Clean up the URL.createObjectURL
  }
}
