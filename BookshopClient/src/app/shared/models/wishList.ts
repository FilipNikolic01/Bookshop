import { ICartItem } from "./shoppingCart";
import { v4 as uuidv4 } from "uuid";

export interface IWishList {
    id: string;
    items: ICartItem[];
}

export class WishList implements IWishList {
    id = uuidv4();
    items: ICartItem[] = [];
}