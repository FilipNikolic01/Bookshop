import { IAddress } from "./address"

export interface IOrderToCreate {
    shoppingCartId: string
    deliveryMethodId: number
    orderAddress: IAddress
}

export interface IOrder {
    id: number
    buyerEmail: string
    orderDate: string
    orderAddress: IAddress
    deliveryMethod: string
    shippingPrice: number
    orderItems: IOrderItem[]
    subtotal: number
    total: number
    status: string
}

export interface IOrderItem {
    bookId: number
    bookTitle: string
    pictureURL: string
    price: number
    quantity: number
}