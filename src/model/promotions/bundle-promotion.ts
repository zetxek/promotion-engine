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

    getOverview():string{
        let overview = `Bundle promotion (${this.bundlePrice})`;
        this.requiredItems.forEach(requiredProduct => {
            overview += `\n- ${requiredProduct.sku}`
        });
        return overview;
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

    calculateDiscount(cart: Cart): [number, Cart] {
        if (!this.doesCartHaveAllProducts(cart)){
            return [0, cart];
        }

        let oldPrice = 0;
        let counter = 0;
        this.requiredItems.forEach(requiredProduct => {
            counter++;
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const requiredAmount = this.requiredItems.getValue(requiredProduct)!;
            
            const totalPrice = requiredProduct.price * requiredAmount;
            oldPrice = oldPrice + totalPrice;

            cart.updateProductAmount(requiredProduct, requiredAmount);
            if (counter < this.requiredItems.size()){
                cart.updateProductPrice(requiredProduct, 0);
            }else{
                cart.updateProductPrice(requiredProduct, this.bundlePrice);
            }
        });      

        const discount = oldPrice - this.bundlePrice;
        return [discount, cart];
    }

    getRequiredProductAmount(product: Product): number {
        if (this.requiredItems.containsKey(product)){
            return this.requiredItems.getValue(product) as number;
        }else{
            return 0;        
        }
    }

    public doesCartHaveAllProducts(cart: Cart): boolean {
        let allProducts = true;
        this.requiredItems.forEach(element => {
            const reqAmount = this.getRequiredProductAmount(element);
            if (!cart.hasProduct(element) || (reqAmount > cart.getProductAmount(element)) ){
                allProducts = false;
            }
        });
        return allProducts;
    }

    public isApplicable(cart: Cart): boolean{
        return this.doesCartHaveAllProducts(cart);
    }

}