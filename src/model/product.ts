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
        return this.sku;
    }
}