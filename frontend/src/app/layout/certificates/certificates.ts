import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-certificates',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './certificates.html',
  styleUrls: ['./certificates.css']
})
export class Certificates {
  showForm = false;

  certificate = {
    certificateName: '',
    issuerName: '',
    validFrom: '',
    validTo: '',
    status: 'ACTIVE'
  };

  openForm() {
    const now = new Date();
    const validFrom = now.toISOString().slice(0, 16);
    const expiry = new Date(now);
    expiry.setDate(expiry.getDate() + 397);
    const validTo = expiry.toISOString().slice(0, 16);

    this.certificate.validFrom = validFrom;
    this.certificate.validTo = validTo;

    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
  }

  onBackgroundClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('modal')) {
      this.closeForm();
    }
  }

  createCertificate() {
    const formattedFrom = new Date(this.certificate.validFrom).toLocaleString();
    const formattedTo = new Date(this.certificate.validTo).toLocaleString();

    console.log('Certificate created:', this.certificate);

    alert(
      `✅ Certificate "${this.certificate.certificateName}" created!\n\n` +
      `Issuer: ${this.certificate.issuerName}\n` +
      `Valid From: ${formattedFrom}\n` +
      `Valid To: ${formattedTo}`
    );

    this.certificate = {
      certificateName: '',
      issuerName: '',
      validFrom: '',
      validTo: '',
      status: 'ACTIVE'
    };

    this.closeForm();
  }
}
