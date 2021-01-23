import "mocha"
import "should"
import { Cart } from "../../../model/cart";
import { Product } from "../../../model/product";
import { BundlePromotion } from "../../../model/promotions/bundle-promotion";
import { PromotionEngine } from "../../../manager/promotion-engine";
import { AmountPromotion } from "../../../model/promotions/amount-promotion";
import * as Collections from 'typescript-collections';

describe("PromotionEngine", () => { 

    const pA = new Product("A", 50);
    const pB = new Product("B", 30);
    const pC = new Product("C", 20);
    const pD = new Product("C", 15);

    let testCart : Cart;
    let promotionEngine : PromotionEngine;

    const discountedItems = new Collections.Dictionary<Product, number>();
    discountedItems.setValue(pC, 1);
    discountedItems.setValue(pD, 1);

    const bundlePromotion = new BundlePromotion(discountedItems, 30);

    const amountPromotion1 = new AmountPromotion(pA, 3, 130);
    const amountPromotion2 = new AmountPromotion(pB, 2, 45);

    const activePromotions = [bundlePromotion, amountPromotion1, amountPromotion2];
    
    beforeEach(() => {
        testCart = new Cart();
        promotionEngine = new PromotionEngine();
    });

    describe("PromotionEngine", () => { 

        it("1A, 1B, 1C = 100", () => {

            testCart.add(pA, 1);
            testCart.add(pB, 1);
            testCart.add(pC, 1);

            const result = promotionEngine.getDiscountedPrice(testCart, activePromotions);
            result.should.be.equal(0);

        });
    });
});