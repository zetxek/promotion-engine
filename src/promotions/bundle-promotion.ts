import { Dictionary } from "typescript-collections";
import { Cart } from "../cart";
import { Promotion } from "./promotion";
import * as Collections from 'typescript-collections';
import { Product } from "../product";

export class BundlePromotion implements Promotion{

    requiredItems = new Collections.Dictionary<Product, number>();

    public addRequiredItem(product : Product, amount : number){
        this.requiredItems.setValue(product, amount);
    }

    calculateDiscount(cart: Cart): number {
        throw new Error("Method not implemented.");
    }

}