import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from './message.service';

declare var Razorpay: any;

@Injectable({ providedIn: 'root' })
export class RazorpayService {

  constructor(private http: HttpClient,private msg: MessageService) {}

  // 🔹 Call backend to create order
  createOrder(amount: number) {
    return this.http.post<any>('/.netlify/functions/create-order', { amount });
    // return this.http.post<any>('http://localhost:5000/create-order', {
    //   amount
    // });
  }

  // 🔹 Open Razorpay payment popup
  openRazorpay(order: any, user: any, onSuccess: (payment: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }) => void) {

    const options = {
      key: 'rzp_test_S2w23X4BaInNI6',     // 🔑 Razorpay TEST Key ID
      amount: order.amount,         // amount from backend (paise)
      currency: order.currency,
      name: 'E-Mart',
      description: 'Order Payment',
      order_id: order.id,           // 🔐 Razorpay Order ID

      handler: (response: any) => {
        this.msg.show('success', 'Payment Successful');
        onSuccess({
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_order_id: response.razorpay_order_id,
        razorpay_signature: response.razorpay_signature
      });                // ✅ callback (save order)
      },

      prefill: {
        name: user?.name || 'Guest',
        email: user?.email || '',
        contact: user?.phone || ''
      },

      theme: {
        color: '#0d6efd'
      }
    };

    const rzp = new Razorpay(options);
    rzp.open();
  }
}
