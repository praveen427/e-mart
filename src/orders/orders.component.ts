import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../app/services/auth.service';
import { MessageService } from '../app/services/message.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.component.html'
})
export class OrdersComponent {
  orders: any[] = [];
  userId!: number;

  constructor(
    private auth: AuthService,
    private msg: MessageService
  ) {
    const user = this.auth.getUser();
    this.userId = user?.id;

    if (typeof localStorage !== 'undefined') {
      const allOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      this.orders = allOrders.filter((o: any) => o.user.id === this.userId);
    }
  }

  // 🗑 Delete single order
  deleteOrder(orderId: string) {
    if (!confirm('Are you sure you want to delete this order?')) return;

    const allOrders = JSON.parse(localStorage.getItem('orders') || '[]');

    const updatedOrders = allOrders.filter(
      (o: any) => o.orderId !== orderId
    );

    localStorage.setItem('orders', JSON.stringify(updatedOrders));

    // Update UI
    this.orders = this.orders.filter(o => o.orderId !== orderId);

    this.msg.show('success', 'Order deleted successfully');
  }

  // 🔥 Clear all orders for this user
  clearAllOrders() {
    if (!confirm('This will delete ALL your orders. Continue?')) return;

    const allOrders = JSON.parse(localStorage.getItem('orders') || '[]');

    const remainingOrders = allOrders.filter(
      (o: any) => o.user.id !== this.userId
    );

    localStorage.setItem('orders', JSON.stringify(remainingOrders));
    this.orders = [];

    this.msg.show('success', 'All orders cleared');
  }
}
