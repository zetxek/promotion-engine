
import * as Collections from 'typescript-collections';

/**
 * Holds information about a product: SKU and price
 */
export class Product {
    public sku : string;
    public price: number;

    constructor(sku: string, price: number){
        this.sku = sku;
        this.price = price;
    }

    toString(): string {
        // Short hand. Adds each own property
        return Collections.util.makeString(this);
    }
}