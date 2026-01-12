import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { MessageService } from '../../services/message.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private auth: AuthService, private router: Router,private msg: MessageService) {}

login() {
  this.auth.login(this.email, this.password).subscribe(users => {
    if (!users.length) {
      return this.msg.show('danger', 'Invalid credentials');
    }

    const user = users[0];
    this.router.navigate([user.role === 'Admin' ? '/admin' : '/home']);
  });
}

}
