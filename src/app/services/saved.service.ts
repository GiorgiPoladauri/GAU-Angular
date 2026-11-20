import { Injectable, computed, signal } from '@angular/core';

/** "Save for later" / favourites. Stored in localStorage. */
@Injectable({ providedIn: 'root' })
export class SavedService {
  private readonly key = 'saved-products';
  private ids = signal<number[]>(this.load());

  readonly count = computed(() => this.ids().length);

  isSaved(id: number): boolean {
    return this.ids().includes(id);
  }

  toggle(id: number): void {
    this.ids.update((list) =>
      list.includes(id) ? list.filter((x) => x !== id) : [...list, id]
    );
    localStorage.setItem(this.key, JSON.stringify(this.ids()));
  }

  private load(): number[] {
    try {
      return JSON.parse(localStorage.getItem(this.key) ?? '[]');
    } catch {
      return [];
    }
  }
}
