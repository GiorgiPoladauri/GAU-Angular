import { Component } from '@angular/core';
import { TodoComponent } from './to-do/to-do.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TodoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {}