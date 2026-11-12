/** cart-ში დამატებული პროდუქტი */
export interface CartItem {
  id: string;          // პროდუქტის უნიკალური იდენტიფიკატორი (image1, image2 ...)
  name: string;
  image: string;
  price: number;       // რიცხვითი ფასი (მაგ. 145)
  quantity: number;
  size?: string;
  color?: string;
}
