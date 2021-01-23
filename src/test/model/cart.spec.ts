import "mocha"
import "should"

import { Cart } from "../../model/cart";
import { Product } from "../../model/product";

describe("Cart", () => { 

    let tested : Cart;
    beforeEach(() => tested = new Cart());

    describe("Creates an empty cart", () => {
        it("should create an empty cart", () => {
            tested.getTotalCount().should.be.equal(0);
            tested.getUniqueCount().should.be.equal(0);
        });
    });

    describe("Creates a cart and adds products", () => {
        it("should add an item", () => {
            const pB = new Product("B", 30);
            tested.add(pB, 1);

            tested.getTotalCount().should.be.equal(1);
            tested.getUniqueCount().should.be.equal(1);
        });

        it("should add an item, allow add/remove operations", () => {
            const pB = new Product("B", 30);
            tested.add(pB, 1);

            tested.add(pB, 5);

            tested.getTotalCount().should.be.equal(6);

            tested.remove(pB, 2);
            tested.getTotalCount().should.be.equal(4);

        });

        it("should handle item removal then amount = 0", () => {
            const pB = new Product("B", 30);
            tested.add(pB, 30);
            tested.remove(pB, 31);

            tested.getTotalCount().should.be.equal(0);
            tested.getUniqueCount().should.be.equal(0);
        });
    });

});