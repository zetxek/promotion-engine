import 'mocha';
import 'should';
import * as Collections from 'typescript-collections';
import {BasicCart} from '../../../model/cart/basic-cart';
import {Cart} from '../../../model/cart/cart';
import {Product} from '../../../model/product';
import {BundlePromotion} from '../../../model/promotions/bundle-promotion';

describe('BundlePromotion', () => {
  describe('BundlePromotion', () => {
    it('should get a discount of 15', () => {
      const pC = new Product('C', 20);
      const pD = new Product('D', 15);

      const discountedItems = new Collections.Dictionary<Product, number>();
      discountedItems.setValue(pC, 1);
      discountedItems.setValue(pD, 1);

      const promotion = new BundlePromotion(discountedItems, 30);

      const cart: Cart = new BasicCart();
      cart.add(pC, 1);
      cart.add(pD, 1);

      promotion.calculateDiscount(cart)[0].should.be.equal(5);
    });
  });
});
