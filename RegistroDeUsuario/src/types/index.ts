export interface Product {
  id: string;
  name: string;
  language: string;
  level: string;
  price: number;
  typeId: string;
}

export interface ProductType {
  id: string;
  name: string;
}