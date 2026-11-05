export interface Workshop {
  id: number;
  title: string;
  category: string;
  date: string;
  price: number;
  availableSeats: number;
  popular: boolean;
  discount: number;
}

export interface BookingItem {
  workshop: Workshop;
  quantity: number;
}