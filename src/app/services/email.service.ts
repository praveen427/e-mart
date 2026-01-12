import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';

@Injectable({ providedIn: 'root' })
export class EmailService {

  private SERVICE_ID = 'service_m0e39m8';
  private PUBLIC_KEY = 'bV--r_GPSsyOLnT5v';

  // 🔹 Template IDs
  private ORDER_TEMPLATE_ID = 'template_0dz14x8';
  private OTP_TEMPLATE_ID = 'template_otp_reset'; // 👈 create this in EmailJS

  /**
   * ✅ Send Order Confirmation Email
   */
  sendOrderEmail(
    toEmail: string,
    userName: string,
    orderItems: any[],
    total: number
  ) {
   const htmlTable = `
<table width="100%" cellpadding="8" cellspacing="0" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px;">
  <thead>
    <tr style="background:#0d6efd;color:#fff;text-align:left;">
      <th>Product</th>
      <th style="text-align:right;">Price</th>
      <th style="text-align:center;">Qty</th>
    </tr>
  </thead>
  <tbody>
    ${orderItems.map(item => `
      <tr>
        <td style="border-bottom:1px solid #ddd;padding:5px 0; display:flex; align-items:center;">
              <img src="${item.image || ''}" alt="${item.name}" width="60" height="60" style="margin-right:10px; object-fit:cover; border-radius:5px;" />
              <span>${item.name}</span>
            </td>
        <td style="text-align:right;border-bottom:1px solid #ddd;padding:5px 0;">₹${item.price}</td>
        <td style="text-align:center;border-bottom:1px solid #ddd;padding:5px 0;">${item.quantity}</td>
      </tr>
    `).join('')}
    <tr>
      <td colspan="2" style="padding-top:10px;font-weight:bold;">Total</td>
      <td style="text-align:center;padding-top:10px;font-weight:bold;">₹${total}</td>
    </tr>
  </tbody>
</table>
`;


    const params = {
      to_email: toEmail,
      user_name: userName,
      order_table: htmlTable,
      total: total
    };

    return emailjs.send(
      this.SERVICE_ID,
      this.ORDER_TEMPLATE_ID,
      params,
      this.PUBLIC_KEY
    );
  }

  /**
   * ✅ Send OTP for Forgot Password
   */
  sendOtpEmail(
    toEmail: string,
    userName: string,
    otp: string
  ) {
    const params = {
      to_email: toEmail,
      user_name: userName,
      otp: otp
    };

    return emailjs.send(
      this.SERVICE_ID,
      this.OTP_TEMPLATE_ID,
      params,
      this.PUBLIC_KEY
    );
  }
}
