import { Cart } from "../cart";
import { Promotion } from "./promotion";
import * as Collections from 'typescript-collections';
import { Product } from "../product";

export class BundlePromotion implements Promotion{

    requiredItems = new Collections.Dictionary<Product, number>();
    bundlePrice : number;

    constructor(requiredItems : Collections.Dictionary<Product, number>, price : number){
        this.requiredItems = requiredItems;
        this.bundlePrice = price;
    }

    /**
     * Adds (or replaces) the amount of items of type Product for the promotion
     * @param product Product type that should be discounted
     */
    public addSingleRequiredItem(product : Product) : void{
        this.requiredItems.setValue(product, 1);
    }

    /**
     * Adds (or replaces) the amount of items of type Product for the promotion
     * @param product Product type that should be discounted
     * @param amount 
     */
    public addRequiredItem(product : Product, amount : number) : void{
        this.requiredItems.setValue(product, amount);
    }

    calculateDiscount(cart: Cart): number {
        if (!this.doesCartHaveAllProducts(cart)){
            return 0;
        }

        let oldPrice = 0;
        this.requiredItems.forEach(element => {
            const productPrice = this.requiredItems.getValue(element) ?
            this.requiredItems.getValue(element) : 0;
     
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const totalPrice = element.price * productPrice!;
            oldPrice = oldPrice + totalPrice;
        });      

        const discount = oldPrice - this.bundlePrice;
        return discount;
    }

    getRequiredProductAmount(product: Product): number {
        if (this.requiredItems.containsKey(product)){
            return this.requiredItems.getValue(product) as number;
        }else{
            return 0;        
        }
    }

    public doesCartHaveAllProducts(cart: Cart) : boolean {
        let allProducts = true;
        this.requiredItems.forEach(element => {
            const reqAmount = this.getRequiredProductAmount(element);
            if (!cart.getCartItems().containsKey(element) || (reqAmount > cart.getProductAmount(element)) ){
                allProducts = false;
            }
        });
        return allProducts;
    }

}