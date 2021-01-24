import "mocha";
import "should";

import { Product } from "../../model/product";

describe("Product", () => {
  describe("Product A,50  ()", () => {
    it("should create a Product A with price 50", () => {
      const result = new Product("A", 50);
      result.sku.should.be.equal("A");
      result.price.should.be.equal(50);
    });

    it("should create a Product B with price 50 and change to 30", () => {
      const result = new Product("B", 50);
      result.sku.should.be.equal("B");
      result.price.should.be.equal(50);

      result.price = 30;
      result.price.should.be.equal(30);
    });
  });
});
