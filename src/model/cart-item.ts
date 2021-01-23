import { Product } from "./product";

export class CartItem {
    
    protected product: Product;
    protected amount : number;

    constructor(product: Product, amount: number){
        this.product = product;
        this.amount = amount;
    }
}