import { Product } from "./product";
import * as Collections from 'typescript-collections';


export class Cart {
    protected cartItems: Collections.Dictionary<Product, number>;

    constructor(){
        this.cartItems = new Collections.Dictionary<Product, number>();
    }

    /**
     * Adds a product to the cart - or the given amount if the SKU already exists
     * @param product Product to handle
     * @param amount amount to add to the cart (will be added to the existing, if the item is already present)
     */
    public add(product : Product, amount: number): void {
        let newAmount = amount;
        if (this.cartItems.containsKey(product)){
            const oldAmount = this.cartItems.getValue(product) as number;
            newAmount = oldAmount + newAmount;
        }
        this.cartItems.setValue(product, newAmount);

    }

    /**
     * Removes products from the cart - if they exist
     * It's not allowed to have negative amounts in the cart.
     * @param product Product to handle
     * @param amount amount to substract from the cart
     */
    public remove(product: Product, amount: number): void {
        if (this.cartItems.containsKey(product)){

            const oldAmount = this.cartItems.getValue(product) as number;
            const newAmount = oldAmount - amount >= 0 ? oldAmount - amount : 0;
        
            if (newAmount > 0){
                this.cartItems.setValue(product, newAmount);
            }else{
                this.cartItems.remove(product);
            }
        }
    }

    /**
     * Returns the total amount of items (different SKUs) in the cart
     */
    public getUniqueCount() : number{
        return this.cartItems.size();
    }

    /**
     * Returns the total count of articles in the cart
     */
    public getTotalCount() : number {
        let totalCount = 0;
        this.cartItems.forEach(function (product, amount){
            totalCount = totalCount + amount;
        });
        return totalCount;
    }
}