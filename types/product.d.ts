// product.d.ts
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface Car {
  id: number;
  name: string;
  image: string;
  star: number;
  doors: number;
  seats: number;
  suitcases: number;
  transmission: string;
  climate: string;
  fuelPolicy: string;
  kilometers: number;
  price: number;
  days: number;
  deposit: number;
  rating: number;
}
