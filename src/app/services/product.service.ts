import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, shareReplay } from 'rxjs';
import { Product } from '../models/product';

/**
 * All product data comes from this service (HTTP request to a JSON file).
 * To use a real backend later, only the URL below has to change.
 */
@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);
  private readonly url = 'data/products.json';

  private products$: Observable<Product[]> = this.http
    .get<Product[]>(this.url)
    .pipe(shareReplay(1));

  getProducts(): Observable<Product[]> {
    return this.products$;
  }

  getProductById(id: number): Observable<Product | undefined> {
    return this.products$.pipe(map((list) => list.find((p) => p.id === id)));
  }

  getCategories(): Observable<string[]> {
    return this.products$.pipe(
      map((list) => [...new Set(list.map((p) => p.category))].sort())
    );
  }
}
