import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product, ProductsResponse } from '../models/product.model';

/** პროდუქტების მართვის სერვისი: data.json-დან პროდუქტების წამოღება და ფასის დამუშავება */
@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);
  private readonly url = 'data/data.json';

  getProducts(): Observable<Product[]> {
    return this.http.get<ProductsResponse>(this.url).pipe(map((res) => res.products));
  }

  /** "$145" -> 145 */
  parsePrice(price: string | undefined): number {
    return price ? Number(price.replace(/[^0-9.]/g, '')) : 0;
  }

  getImagePath(image: string): string {
    return `images/${image}.png`;
  }
}
