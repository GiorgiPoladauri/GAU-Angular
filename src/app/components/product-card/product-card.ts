import { Component, inject, input } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

/** ერთი პროდუქტის card */
@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  product = input.required<Product>();

  private productService = inject(ProductService);
  private cartService = inject(CartService);

  imagePath(): string {
    return this.productService.getImagePath(this.product().image);
  }

  stars(): number[] {
    return [1, 2, 3, 4, 5];
  }

  starFill(star: number): string {
    const r = this.product().rating ?? 0;
    return r >= star ? 'full' : r >= star - 0.5 ? 'half' : 'empty';
  }

  addToCart(): void {
    const p = this.product();
    this.cartService.addToCart({
      id: p.image,
      name: p.name,
      image: p.image,
      price: this.productService.parsePrice(p.price),
    });
  }
}
