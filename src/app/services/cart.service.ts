import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {

  private cart: CartItem[] = [];
  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();
  private isBrowser = false;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser) {
      const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
      this.cart = storedCart;
      this.cartCountSubject.next(this.cart.length);
    }
  }

  getCart(): CartItem[] {
    return this.cart;
  }

  addToCart(product: { id: number; name: string; price: number }) {
    const idx = this.cart.findIndex(p => p.id === product.id);

    if (idx > -1) {
      this.cart[idx].quantity += 1;
    } else {
      this.cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1
      });
    }

    this.updateCart();
  }

  removeFromCart(id: number) {
    this.cart = this.cart.filter(p => p.id !== id);
    this.updateCart();
  }

  clearCart() {
    this.cart = [];
    this.updateCart();
  }

  private updateCart() {
    if (this.isBrowser) {
      localStorage.setItem('cart', JSON.stringify(this.cart));
    }
    this.cartCountSubject.next(this.cart.length);
  }
}
