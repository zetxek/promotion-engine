import { Cart } from "../cart";
import * as Collections from 'typescript-collections';

/**
 * A promotion is a type of discount applied in a cart.
 * 
 * It's implemented as a strategy pattern - so each specific implementation
 * can decide how to implement the discount.
 */
export interface Promotion {
    isApplicable(cart: Cart) : boolean;
    /**
     * 
     * @param cart 
     * @returns asasas
     */
    calculateDiscount(cart: Cart): [number,Cart];
    getOverview(): string;
}

/**
 * Base class for promotions with a utillity to provide a default `toString()`
 * implementation.
 */
export abstract class PromotionBase {

    toString(): string {
        // Short hand. Adds each own property
        return Collections.util.makeString(this);
    }
}