/**
 * Holds information about a product: SKU and price
 * The uniqueness comparison in the collections is done via SKU: 
 * the same product SKU with 2 difference prices will be considered the same product.
 */
export class Product {
    public sku : string;
    public price: number;

    constructor(sku: string, price: number){
        this.sku = sku;
        this.price = price;
    }

    toString(): string {
        return this.sku;
    }
}