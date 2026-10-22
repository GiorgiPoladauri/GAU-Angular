export interface User {
  id: number;
  username: string;
  email: string;
  registrationTime: string;
  lastLogin: string;
  status: 'Confirmed' | 'Blocked';
}