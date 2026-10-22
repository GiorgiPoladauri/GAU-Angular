import { Injectable } from '@angular/core';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [
    { id: 1, username: 'admin', email: 'admin@somemail.com', registrationTime: '27-Nov-20 08:30', lastLogin: '27-Nov-20 09:00', status: 'Confirmed' },
    { id: 2, username: 'officer', email: 'officer1@somemail.com', registrationTime: '27-Nov-20 08:30', lastLogin: '27-Nov-20 09:00', status: 'Confirmed' },
    { id: 3, username: 'admin', email: 'admin@somemail.com', registrationTime: '27-Nov-20 08:30', lastLogin: '27-Nov-20 09:00', status: 'Blocked' },
    { id: 4, username: 'officer', email: 'officer1@somemail.com', registrationTime: '27-Nov-20 08:30', lastLogin: '27-Nov-20 09:00', status: 'Confirmed' }
  ];

  getUsers(): User[] {
    return this.users;
  }

  getUserById(id: number): User | undefined {
    return this.users.find(u => u.id === id);
  }
}