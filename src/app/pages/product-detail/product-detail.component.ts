import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { map, switchMap, tap } from 'rxjs';
import { Product, PriceTier } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { SavedService } from '../../services/saved.service';

@Component({
  selector: 'app-product-detail',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent {
  private route = inject(ActivatedRoute);
  private service = inject(ProductService);
  saved = inject(SavedService);

  selectedImage = signal(0);
  quantity = signal(1);
  inquirySent = signal(false);

  // null = loading, undefined = not found
  product = toSignal<Product | undefined | null>(
    this.route.paramMap.pipe(
      map((p) => Number(p.get('id'))),
      tap(() => {
        this.selectedImage.set(0);
        this.quantity.set(1);
        this.inquirySent.set(false);
      }),
      switchMap((id) => this.service.getProductById(id))
    ),
    { initialValue: null }
  );

  private all = toSignal(this.service.getProducts(), { initialValue: [] });

  related = computed(() => {
    const p = this.product();
    if (!p) return [];
    return this.all()
      .filter((x) => x.category === p.category && x.id !== p.id)
      .slice(0, 4);
  });

  // tier that applies to the chosen quantity
  activeTier = computed<PriceTier | null>(() => {
    const p = this.product();
    const q = this.quantity();
    if (!p) return null;
    return (
      p.priceTiers.find(
        (t) => q >= t.minQty && (t.maxQty === null || q <= t.maxQty)
      ) ?? p.priceTiers[0]
    );
  });

  total = computed(() => (this.activeTier()?.price ?? 0) * this.quantity());

  specEntries = computed(() => Object.entries(this.product()?.specs ?? {}));

  onQuantity(event: Event): void {
    const v = Math.max(1, Math.floor(Number((event.target as HTMLInputElement).value) || 1));
    this.quantity.set(v);
  }

  isActive(t: PriceTier): boolean {
    return this.activeTier() === t;
  }

  tierLabel(t: PriceTier): string {
    return t.maxQty === null ? `${t.minQty}+ pcs` : `${t.minQty}-${t.maxQty} pcs`;
  }

  stars(rating: number): string {
    const n = Math.round(rating / 2);
    return '★'.repeat(n) + '☆'.repeat(5 - n);
  }
}
