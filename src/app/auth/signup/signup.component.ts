import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { MessageService } from '../../services/message.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './signup.component.html'
})
export class SignupComponent {
  user: any = { role: 'User' };

  constructor(private auth: AuthService, private router: Router,private msg: MessageService) {}

  signup() {
    if (!this.user.email || !this.user.password) {
      return this.msg.show('danger', 'Please fill all fields');
    }

    this.auth.signup(this.user).subscribe({
      next: () => {
        this.msg.show('success', 'Signup successful! Please login.');
        this.router.navigate(['/']); // redirect to login
      },
      error: (err) =>  this.msg.show('danger', 'Error: ' + err)
    });
  }
}
