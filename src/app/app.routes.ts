import { Routes } from '@angular/router';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';

export const routes: Routes = [
  { path: '', component: ProductListComponent, title: 'Products' },
  { path: 'product/:id', component: ProductDetailComponent, title: 'Product details' },
  { path: '**', redirectTo: '' },
];
