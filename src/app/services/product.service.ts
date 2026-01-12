import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private api = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<any[]>(this.api);
  }

  addProduct(product: any) {
  return this.http.post(this.api, product); // JSON Server will store all fields
}

updateProduct(product: any) {
  return this.http.put(`${this.api}/${product.id}`, product);
}

  deleteProduct(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }
}
