import { Component, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { BookingService } from '../booking.service';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent {
  readonly bookingService = inject(BookingService);

  increase(id: number): void {
    this.bookingService.increase(id);
  }

  decrease(id: number): void {
    this.bookingService.decrease(id);
  }

  remove(id: number): void {
    this.bookingService.remove(id);
  }
}
