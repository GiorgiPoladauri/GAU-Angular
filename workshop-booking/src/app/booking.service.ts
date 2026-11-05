import { Injectable, computed, signal } from '@angular/core';
import { BookingItem, Workshop } from './models';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private readonly itemsSignal = signal<BookingItem[]>([]);

  readonly items = this.itemsSignal.asReadonly();

  readonly totalSeats = computed(() =>
    this.items().reduce((sum, item) => sum + item.quantity, 0)
  );

  readonly totalPrice = computed(() =>
    this.items().reduce((sum, item) => sum + this.getLineTotal(item), 0)
  );

  getUnitPrice(workshop: Workshop): number {
    return workshop.discount > 0
      ? workshop.price * (1 - workshop.discount / 100)
      : workshop.price;
  }

  getLineTotal(item: BookingItem): number {
    return this.getUnitPrice(item.workshop) * item.quantity;
  }

  addWorkshop(workshop: Workshop): boolean {
    if (workshop.availableSeats <= 0) {
      return false;
    }
    const existing = this.items().find(i => i.workshop.id === workshop.id);
    if (!existing) {
      this.itemsSignal.update(list => [...list, { workshop, quantity: 1 }]);
      return true;
    }
    if (existing.quantity >= workshop.availableSeats) {
      return false;
    }
    this.changeQuantity(workshop.id, 1);
    return true;
  }

  increase(id: number): void {
    this.changeQuantity(id, 1);
  }

  decrease(id: number): void {
    this.changeQuantity(id, -1);
  }

  remove(id: number): void {
    this.itemsSignal.update(list => list.filter(i => i.workshop.id !== id));
  }

  private changeQuantity(id: number, delta: number): void {
    this.itemsSignal.update(list =>
      list.map(item => {
        if (item.workshop.id !== id) {
          return item;
        }
        const next = item.quantity + delta;
        if (next < 1 || next > item.workshop.availableSeats) {
          return item;
        }
        return { ...item, quantity: next };
      })
    );
  }
}