import "mocha"
import "should"
import { Cart } from "../../cart";
import { Product } from "../../product";
import { AmountPromotion } from "../../promotions/amount-promotion";


describe("AmountPromotion", () => { 

    describe("AmountPromotion(A,3,130)", () => {
        it("should create a", () => {
            const pA = new Product("A", 50);
            const promotion = new AmountPromotion(pA, 3, 130);
            const cart = new Cart();
            cart.add(pA, 3);
            promotion.calculateDiscount(cart).should.be.equal(20);
        });
    });
});