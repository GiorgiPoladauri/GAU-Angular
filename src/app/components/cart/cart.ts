import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';

/** Cart-ის კომპონენტი: ელემენტების სია + Order Summary */
@Component({
  selector: 'app-cart',
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  cart = inject(CartService);
  private productService = inject(ProductService);

  imagePath(image: string): string {
    return this.productService.getImagePath(image);
  }

  increase(id: string, qty: number): void {
    this.cart.updateQuantity(id, qty + 1);
  }

  decrease(id: string, qty: number): void {
    this.cart.updateQuantity(id, qty - 1);
  }

  remove(id: string): void {
    this.cart.removeItem(id);
  }
}
