import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  count: number = 3;

  addCount(): void {
    this.count++;
  }

  lowerCount(): void {
    this.count--;
  }
}