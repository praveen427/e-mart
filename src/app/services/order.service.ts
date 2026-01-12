import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class OrderService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  getAllOrders() {
    if (isPlatformBrowser(this.platformId)) {
      return JSON.parse(localStorage.getItem('orders') || '[]');
    }
    return [];
  }

  saveOrder(order: any) {
    if (!isPlatformBrowser(this.platformId)) return;

    const orders = this.getAllOrders();
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
  }
}
