import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { MessageService } from '../../services/message.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  products: any[] = [];
  cartCount:number = 0;
  constructor(
    private ps: ProductService,
    private cartService: CartService,
    private msg: MessageService
  ) {}

  ngOnInit() {
    this.ps.getProducts().subscribe(data => this.products = data);
    this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });
  }

  add(product: any) {
    this.cartService.addToCart(product);
    this.msg.show('success', `${product.name} added to cart`);
  }
}
