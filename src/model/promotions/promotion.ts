import { Cart } from "../cart";

export interface Promotion {
    calculateDiscount(cart: Cart): number;
}