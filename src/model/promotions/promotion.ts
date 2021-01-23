import { Cart } from "../cart";

export interface Promotion {
    isApplicable(cart: Cart) : boolean;
    calculateDiscount(cart: Cart): [number,Cart];
}