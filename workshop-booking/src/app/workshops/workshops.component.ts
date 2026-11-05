import { Component, computed, inject, signal } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorkshopService } from '../workshop.service';
import { BookingService } from '../booking.service';
import { Workshop } from '../models';

@Component({
  selector: 'app-workshops',
  standalone: true,
  imports: [FormsModule, DatePipe, DecimalPipe],
  templateUrl: './workshops.component.html',
  styleUrl: './workshops.component.css'
})
export class WorkshopsComponent {
  private readonly workshopService = inject(WorkshopService);
  readonly bookingService = inject(BookingService);

  readonly categories = this.workshopService.getCategories();
  readonly searchText = signal('');
  readonly selectedCategory = signal('');
  readonly sortOrder = signal<'asc' | 'desc'>('asc');
  readonly message = signal('');

  readonly filteredWorkshops = computed(() => {
    const search = this.searchText().trim().toLowerCase();
    const category = this.selectedCategory();
    const direction = this.sortOrder() === 'asc' ? 1 : -1;

    return this.workshopService
      .getWorkshops()
      .filter(w => !category || w.category === category)
      .filter(w => w.title.toLowerCase().includes(search))
      .sort((a, b) =>
        (this.bookingService.getUnitPrice(a) - this.bookingService.getUnitPrice(b)) * direction
      );
  });

  book(workshop: Workshop): void {
    const added = this.bookingService.addWorkshop(workshop);
    this.message.set(
      added
        ? `„${workshop.title}“ დაემატა დაჯავშნის სიაში`
        : `„${workshop.title}“: ხელმისაწვდომი ადგილების მაქსიმალური რაოდენობა უკვე დაჯავშნილია`
    );
  }
}