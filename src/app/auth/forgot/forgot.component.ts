import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { EmailService } from '../../services/email.service';
import { MessageService } from '../../services/message.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './forgot.component.html'
})
export class ForgotComponent {

  email = '';
  otp = '';
  newPassword = '';

  generatedOtp = '';
  step: 'email' | 'verify' = 'email';
  user: any;

  constructor(
    private auth: AuthService,
    private emailService: EmailService,
    private msg: MessageService,
    private router: Router
  ) {}

  sendOtp() {
    const user = this.auth.getUserByEmail(this.email);
    if (!user) {
      this.msg.show('danger', 'Email not registered');
      return;
    }

    this.user = user;
    this.generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

    this.emailService.sendOtpEmail(
      user.email,
      user.name || 'User',
      this.generatedOtp
    ).then(() => {
      this.msg.show('success', 'OTP sent to your email');
      this.step = 'verify';
    }).catch(() => {
      this.msg.show('danger', 'Failed to send OTP');
    });
  }

  verifyOtpAndReset() {
    if (this.otp !== this.generatedOtp) {
      this.msg.show('danger', 'Invalid OTP');
      return;
    }

    this.auth.updatePassword(this.user.id, this.newPassword);
    this.msg.show('success', 'Password reset successfully');
    this.router.navigate(['/']);
  }
}
