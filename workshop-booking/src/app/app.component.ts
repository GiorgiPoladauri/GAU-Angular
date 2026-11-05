import { Component } from '@angular/core';
import { WorkshopsComponent } from './workshops/workshops.component';
import { BookingComponent } from './booking/booking.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [WorkshopsComponent, BookingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {}