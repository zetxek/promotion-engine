import 'mocha';
import 'should';
import {Cart} from '../../../model/cart';
import {Product} from '../../../model/product';
import {AmountPromotion} from '../../../model/promotions/amount-promotion';

describe('AmountPromotion', () => {
  const pA = new Product('A', 50);
  const pB = new Product('B', 30);

  describe('AmountPromotion(A,3,130)', () => {
    it('should get a discount of 20', () => {
      const promotion = new AmountPromotion(pA, 3, 130);
      const cart = new Cart();
      cart.add(pA, 3);
      promotion.calculateDiscount(cart)[0].should.be.equal(20);
    });
  });

  describe('AmountPromotion(B,2,45)', () => {
    const promotion = new AmountPromotion(pB, 2, 45);

    it('should get a discount of 15', () => {
      const cart = new Cart();
      cart.add(pB, 2);
      promotion.calculateDiscount(cart)[0].should.be.equal(15);
    });

    it('should get a discount of 30', () => {
      const cart = new Cart();
      cart.add(pB, 5);
      promotion.calculateDiscount(cart)[0].should.be.equal(30);
    });
  });
});
