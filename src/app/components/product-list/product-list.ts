import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductService } from '../../services/product.service';
import { ProductCard } from '../product-card/product-card';

/** პროდუქტების სიის კომპონენტი */
@Component({
  selector: 'app-product-list',
  imports: [ProductCard],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  private productService = inject(ProductService);
  products = toSignal(this.productService.getProducts(), { initialValue: [] });
}
