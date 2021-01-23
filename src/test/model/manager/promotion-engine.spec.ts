import "mocha"
import "should"
import { Cart } from "../../../model/cart";
import { Product } from "../../../model/product";
import { BundlePromotion } from "../../../model/promotions/bundle-promotion";
import { PromotionEngine } from "../../../manager/promotion-engine";
import { AmountPromotion } from "../../../model/promotions/amount-promotion";
import * as Collections from 'typescript-collections';

describe("PromotionEngine", () => { 

    let pA = new Product("A", 50);
    let pB = new Product("B", 30);
    let pC = new Product("C", 20);
    let pD = new Product("D", 15);

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

        pA = new Product("A", 50);
        pB = new Product("B", 30);
        pC = new Product("C", 20);
        pD = new Product("D", 15);

    
    });

    describe("Validating sample carts", () => { 

        it("(no promotions) 1A, 1B, 1C = 100", () => {

            testCart.add(pA, 1);
            testCart.add(pB, 1);
            testCart.add(pC, 1);

            const result = promotionEngine.getDiscountedPrice(testCart, activePromotions);
            const discountedPrice = testCart.getTotalPrice() - result;
            // 100 - 100
            discountedPrice.should.be.equal(100);

        });

        it("5A, 5B, 1C = 370", () => {

            testCart.add(pA, 5);
            testCart.add(pB, 5);
            testCart.add(pC, 1);

            const result = promotionEngine.getDiscountedPrice(testCart, activePromotions);
            const discountedPrice = testCart.getTotalPrice() - result;
            // 420 vs 370
            discountedPrice.should.be.equal(370);

        });

        it("3A, 5B, 1C, 1D = 370", () => {

            testCart.add(pA, 3);
            testCart.add(pB, 5);
            testCart.add(pC, 1);
            testCart.add(pD, 1);

            const result = promotionEngine.getDiscountedPrice(testCart, activePromotions);
            const discountedPrice = testCart.getTotalPrice() - result;
            // 335 vs 280
            discountedPrice.should.be.equal(280);

        });
    });
});