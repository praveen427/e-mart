import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CartService } from './services/cart.service';
import { CommonModule } from '@angular/common';
import { MessageService } from './services/message.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  currentUser: any = null;
  cartCount = 0;
  message: any;
  constructor(private auth: AuthService, private router: Router, private cartService: CartService, private msg: MessageService) {
    this.msg.message$.subscribe(m => this.message = m);
     this.cartService.cartCount$.subscribe(count => this.cartCount = count);
  }

  ngOnInit() {
    if (typeof window !== 'undefined') { 
      // Protect from SSR or server-side reload
      this.currentUser = this.auth.getUser();
    }
  }

  logout() {
    this.auth.logout();
    this.currentUser = null;
    this.router.navigate(['/']);
  }

  close() {
    this.msg.clear();
  }
}
