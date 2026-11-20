import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { Product, SortKey } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { SavedService } from '../../services/saved.service';

@Component({
  selector: 'app-product-list',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private service = inject(ProductService);
  saved = inject(SavedService);

  readonly sortOptions: { value: SortKey; label: string }[] = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-asc', label: 'Price: low to high' },
    { value: 'price-desc', label: 'Price: high to low' },
    { value: 'rating', label: 'Top rated' },
    { value: 'orders', label: 'Most ordered' },
    { value: 'name', label: 'Name: A–Z' },
  ];

  // data from the service (null = still loading)
  private products = toSignal<Product[] | null>(this.service.getProducts(), {
    initialValue: null,
  });
  private params = toSignal(this.route.queryParamMap, {
    initialValue: this.route.snapshot.queryParamMap,
  });

  loading = computed(() => this.products() === null);
  q = computed(() => this.params().get('q') ?? '');
  category = computed(() => this.params().get('category') ?? '');
  sort = computed(() => (this.params().get('sort') ?? 'featured') as SortKey);
  view = computed<'list' | 'grid'>(() =>
    this.params().get('view') === 'grid' ? 'grid' : 'list'
  );
  freeOnly = computed(() => this.params().get('free') === '1');

  // filter -> sort
  items = computed(() => {
    let list = [...(this.products() ?? [])];
    const q = this.q().toLowerCase();
    const cat = this.category();

    if (q) list = list.filter((p) => p.name.toLowerCase().includes(q));
    if (cat) list = list.filter((p) => p.category === cat);
    if (this.freeOnly()) list = list.filter((p) => p.freeShipping);

    switch (this.sort()) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        list.sort((a, b) => b.rating - a.rating);
        break;
      case 'orders':
        list.sort((a, b) => b.orders - a.orders);
        break;
      case 'name':
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
    return list;
  });

  setParam(key: string, value: string | null): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { [key]: value },
      queryParamsHandling: 'merge',
    });
  }

  onSort(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.setParam('sort', value === 'featured' ? null : value);
  }

  onFree(event: Event): void {
    this.setParam('free', (event.target as HTMLInputElement).checked ? '1' : null);
  }

  clearFilters(): void {
    this.router.navigate([], { queryParams: {} });
  }

  stars(rating: number): string {
    const n = Math.round(rating / 2);
    return '★'.repeat(n) + '☆'.repeat(5 - n);
  }

  toggleSaved(event: Event, id: number): void {
    event.preventDefault();
    event.stopPropagation();
    this.saved.toggle(id);
  }
}
