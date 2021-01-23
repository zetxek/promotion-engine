import { Cart } from "../cart";
import * as Collections from 'typescript-collections';

export interface Promotion {
    isApplicable(cart: Cart) : boolean;
    calculateDiscount(cart: Cart): [number,Cart];
}

export abstract class PromotionBase {

    toString(): string {
        // Short hand. Adds each own property
        return Collections.util.makeString(this);
    }
}