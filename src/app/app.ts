import { Component } from '@angular/core';
import { Cart } from './components/cart/cart';
import { ProductList } from './components/product-list/product-list';

@Component({
  selector: 'app-root',
  imports: [Cart, ProductList],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
