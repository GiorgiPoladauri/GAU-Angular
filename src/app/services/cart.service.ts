import { Injectable, computed, signal } from '@angular/core';
import { CartItem } from '../models/cart-item.model';

/** Cart-ის მართვის სერვისი: დამატება, რაოდენობის განახლება, წაშლა, ჯამური ფასის გამოთვლა */
@Injectable({ providedIn: 'root' })
export class CartService {
  readonly discountRate = 0.2;   // 20% ფასდაკლება
  readonly deliveryFee = 15;     // მიტანის საფასური

  // საწყისი მონაცემები დიზაინის მიხედვით
  private readonly _items = signal<CartItem[]>([
    { id: 'image1', name: 'Gradient Graphic T-shirt', image: 'image1', price: 145, quantity: 1, size: 'Large', color: 'White' },
    { id: 'image5', name: 'Checkered Shirt', image: 'image5', price: 180, quantity: 1, size: 'Medium', color: 'Red' },
    { id: 'image4', name: 'Skinny Fit Jeans', image: 'image4', price: 240, quantity: 1, size: 'Large', color: 'Blue' },
  ]);

  readonly items = this._items.asReadonly();

  readonly subtotal = computed(() =>
    this._items().reduce((sum, i) => sum + i.price * i.quantity, 0),
  );
  readonly discount = computed(() => Math.round(this.subtotal() * this.discountRate));
  readonly delivery = computed(() => (this._items().length > 0 ? this.deliveryFee : 0));
  readonly total = computed(() => this.subtotal() - this.discount() + this.delivery());

  /** პროდუქტის დამატება; თუ უკვე არის cart-ში, რაოდენობა იზრდება */
  addToCart(item: Omit<CartItem, 'quantity'>): void {
    this._items.update((items) => {
      const existing = items.find((i) => i.id === item.id);
      if (existing) {
        return items.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...items, { ...item, quantity: 1 }];
    });
  }

  /** რაოდენობის განახლება (მინიმუმ 1) */
  updateQuantity(id: string, quantity: number): void {
    if (quantity < 1) return;
    this._items.update((items) => items.map((i) => (i.id === id ? { ...i, quantity } : i)));
  }

  removeItem(id: string): void {
    this._items.update((items) => items.filter((i) => i.id !== id));
  }
}
