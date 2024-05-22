import { v4 as uuidv4 } from 'uuid';

export interface IShoppingCart {
    id: string;
    items: ICartItem[];
  }
  
export interface ICartItem {
    id: number;
    bookTitle: string;
    price: number;
    quantity: number;
    pictureURL: string;
    publisher: string;
    author: string[];
}

export class ShoppingCart implements IShoppingCart {
    id = uuidv4();
    items: ICartItem[] = [];
}

export interface IShoppingCartTotals {
    shipping: number;
    subtotal: number;
    total: number;
}
