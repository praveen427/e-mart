import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { MessageService } from '../../services/message.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  products: any[] = [];
  product: any = {}; // New or editing product

  constructor(private ps: ProductService,private msg: MessageService,) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.ps.getProducts().subscribe(data => this.products = data);
  }

   addOrUpdate() {
    if (!this.product.name || !this.product.price) {
      return this.msg.show('danger', 'Name and Price are required');
    }

    if (this.product.id) {
      // Edit existing product
      this.ps.updateProduct(this.product).subscribe(() => {
        this.product = {};
        this.loadProducts();
      });
    } else {
      // Add new product
      this.ps.addProduct(this.product).subscribe(() => {
        this.product = {};
        this.loadProducts();
      });
    }
  }

  edit(p: any) {
    this.product = { ...p }; // Copy product to form
  }

  delete(id: number) {
    this.ps.deleteProduct(id).subscribe(() => this.loadProducts());
  }

  handleImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.product.image = e.target.result; // Base64 image
      };
      reader.readAsDataURL(file);
    }
  }
}
