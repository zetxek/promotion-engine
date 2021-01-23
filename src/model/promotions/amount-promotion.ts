
import { Promotion } from "./promotion";
import { Product } from "../product";
import { Cart } from "../cart";

export class AmountPromotion implements Promotion{

    protected product : Product;
    protected amount : number;
    protected discount : number;
    
    constructor(product: Product, amount: number, discountedPrice: number){
        this.product = product;
        this.amount = amount;
        this.discount = discountedPrice;
    }

    calculateDiscount(cart : Cart): [number, Cart]{
        let discount = 0;
        if (cart.getCartItems().containsKey(this.product)){
            const cartAmount = cart.getCartItems().getValue(this.product) as number ;
            if (cartAmount >= this.amount){
                const amountOfDiscountBundles = Math.floor(cartAmount / this.amount);
                const newPrice = amountOfDiscountBundles * this.discount;
                const oldPrice = cart.getCartItems().getValue(this.product) as number * this.product.price;
                discount = oldPrice - newPrice;

                cart.updateProductAmount(this.product, cartAmount - (amountOfDiscountBundles*this.amount));
            }
        }
        return [discount, cart];
    }

    public isApplicable(cart: Cart): boolean{

        if (cart.getCartItems().containsKey(this.product)){
            const cartAmount = cart.getCartItems().getValue(this.product) as number ;
            return cartAmount >= this.amount ;
        }

        return false;
    }
}