declare var Razorpay: any;
import { MessageService } from '../services/message.service';
export class PaymentService {
  constructor(private messageservice: MessageService) {}

  pay(amount: number) {
    const options = {
      key: 'rzp_test_xxxxxxxx',
      amount: amount * 100,
      currency: 'INR',
      name: 'E-Mart',
      handler: () => this.messageservice.show('success', 'Payment Successful') 
    };
    new Razorpay(options).open();
  }
}
