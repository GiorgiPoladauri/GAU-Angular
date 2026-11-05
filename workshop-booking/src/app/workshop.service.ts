import { Injectable } from '@angular/core';
import { Workshop } from './models';

@Injectable({ providedIn: 'root' })
export class WorkshopService {
  private readonly workshops: Workshop[] = [
    { id: 1, title: 'Angular-ის საფუძვლები', category: 'პროგრამირება', date: '2026-12-05', price: 250, availableSeats: 10, popular: true, discount: 0 },
    { id: 2, title: 'TypeScript დამწყებთათვის', category: 'პროგრამირება', date: '2026-12-12', price: 180, availableSeats: 3, popular: false, discount: 20 },
    { id: 3, title: 'UI/UX დიზაინის საფუძვლები', category: 'დიზაინი', date: '2026-12-15', price: 300, availableSeats: 8, popular: true, discount: 15 },
    { id: 4, title: 'Figma პრაქტიკაში', category: 'დიზაინი', date: '2026-12-20', price: 150, availableSeats: 0, popular: false, discount: 0 },
    { id: 5, title: 'ციფრული მარკეტინგი', category: 'მარკეტინგი', date: '2027-01-10', price: 220, availableSeats: 12, popular: false, discount: 10 },
    { id: 6, title: 'სოციალური ქსელების მართვა', category: 'მარკეტინგი', date: '2027-01-17', price: 190, availableSeats: 5, popular: true, discount: 0 },
    { id: 7, title: 'პროექტების მენეჯმენტი', category: 'ბიზნესი', date: '2027-01-24', price: 350, availableSeats: 6, popular: false, discount: 25 },
    { id: 8, title: 'სტარტაპის დაფუძნება', category: 'ბიზნესი', date: '2027-02-02', price: 400, availableSeats: 2, popular: true, discount: 0 }
  ];

  getWorkshops(): Workshop[] {
    return this.workshops;
  }

  getCategories(): string[] {
    return [...new Set(this.workshops.map(w => w.category))];
  }
}
