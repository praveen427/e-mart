import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, CartItem } from '../../services/cart.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RazorpayService } from '../../services/razorpay.service';
import { MessageService } from '../../services/message.service';
import { EmailService } from '../../services/email.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html'
})
export class CartComponent {
  cart: CartItem[] = [];
  orders: any[] = [];

  constructor(
    private cartService: CartService,
    private auth: AuthService,
    private razorpay: RazorpayService,
    private router: Router,
    private msg: MessageService,
    private emailService: EmailService
  ) {
    this.cart = this.cartService.getCart();
  }
  
  remove(id: number) {
    this.cartService.removeFromCart(id);
    this.cart = this.cartService.getCart();
  }

  getTotal() {
    return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  checkout() {
    const total = this.getTotal();
    const user = this.auth.getUser();

    this.razorpay.createOrder(total).subscribe(order => {
      this.razorpay.openRazorpay(order, user, (payment) => {
        this.saveOrder(payment, order, user);
      });
    });
  }

  saveOrder(payment: any, order: any, user: any) {
    const newOrder = {
      orderId: order.id,
      paymentId: payment.razorpay_payment_id,
      user: { id: user?.id, name: user?.name, email: user?.email },
      items: this.cart.map(item => ({
        id: item.id, name: item.name, price: item.price, quantity: item.quantity
      })),
      total: this.getTotal(),
      status: 'PAID',
      createdAt: new Date().toISOString()
    };

    const orders = typeof localStorage !== 'undefined' ? JSON.parse(localStorage.getItem('orders') || '[]') : [];
    orders.push(newOrder);
    if (typeof localStorage !== 'undefined') localStorage.setItem('orders', JSON.stringify(orders));

    this.cartService.clearCart();
    this.cart = [];

    // ✅ Send order email
    this.emailService.sendOrderEmail(
      user.email,
      user.name,
      newOrder.items,
      newOrder.total
    ).then(() => {
      this.msg.show('success', 'Order placed successfully! Email sent.');
    }).catch(err => {
      console.error(err);
      this.msg.show('danger', 'Order placed but email failed.');
    });

    this.router.navigate(['/orders']);
  }
}
