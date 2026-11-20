import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { SavedService } from '../../services/saved.service';

@Component({
  selector: 'app-header',
  imports: [FormsModule, RouterLink, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private router = inject(Router);
  private productService = inject(ProductService);
  saved = inject(SavedService);

  categories$ = this.productService.getCategories();
  query = '';
  category = '';


  search(): void {
    this.router.navigate(['/'], {
      queryParams: {
        q: this.query.trim() || null,
        category: this.category || null,
      },
      queryParamsHandling: 'merge',
    });
  }
}
