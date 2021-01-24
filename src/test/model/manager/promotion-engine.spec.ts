import 'mocha';
import 'should';
import {Product} from '../../../model/product';
import {BundlePromotion} from '../../../model/promotions/bundle-promotion';
import {AmountPromotion} from '../../../model/promotions/amount-promotion';
import * as Collections from 'typescript-collections';
import {DefaultPromotionEngine} from '../../../manager/promotion-engine';
import {Cart} from '../../../model/cart/cart';
import {BasicCart} from '../../../model/cart/basic-cart';
import {BasicCartPriceCalculator} from '../../../manager/cart-price-calculator';

describe('PromotionEngine', () => {
  let pA = new Product('A', 50);
  let pB = new Product('B', 30);
  let pC = new Product('C', 20);
  let pD = new Product('D', 15);

  let testCart: Cart;
  let promotionEngine: DefaultPromotionEngine;

  const discountedItems = new Collections.Dictionary<Product, number>();
  discountedItems.setValue(pC, 1);
  discountedItems.setValue(pD, 1);

  const bundlePromotion = new BundlePromotion(discountedItems, 30);

  const amountPromotion1 = new AmountPromotion(pA, 3, 130);
  const amountPromotion2 = new AmountPromotion(pB, 2, 45);

  const activePromotions = [
    bundlePromotion,
    amountPromotion1,
    amountPromotion2,
  ];

  beforeEach(() => {
    testCart = new BasicCart();
    promotionEngine = new DefaultPromotionEngine();

    pA = new Product('A', 50);
    pB = new Product('B', 30);
    pC = new Product('C', 20);
    pD = new Product('D', 15);
  });

  describe('Validating sample carts', () => {
    it('(no promotions) 1A, 1B, 1C = 100', () => {
      testCart.add(pA, 1);
      testCart.add(pB, 1);
      testCart.add(pC, 1);

      const result = promotionEngine.getDiscountedPrice(
        testCart,
        activePromotions
      );
      const cartManager = new BasicCartPriceCalculator();
      const discountedPrice = cartManager.getTotalPrice(testCart) - result;
      // 100 - 100
      discountedPrice.should.be.equal(100);
    });

    it('5A, 5B, 1C = 370', () => {
      testCart.add(pA, 5);
      testCart.add(pB, 5);
      testCart.add(pC, 1);

      const result = promotionEngine.getDiscountedPrice(
        testCart,
        activePromotions
      );
      const cartManager = new BasicCartPriceCalculator();
      const discountedPrice = cartManager.getTotalPrice(testCart) - result;
      // 420 vs 370
      discountedPrice.should.be.equal(370);
    });

    it('3A, 5B, 1C, 1D = 370', () => {
      testCart.add(pA, 3);
      testCart.add(pB, 5);
      testCart.add(pC, 1);
      testCart.add(pD, 1);

      const result = promotionEngine.getDiscountedPrice(
        testCart,
        activePromotions
      );
      const cartManager = new BasicCartPriceCalculator();
      const discountedPrice = cartManager.getTotalPrice(testCart) - result;
      // 335 vs 280
      discountedPrice.should.be.equal(280);
    });
  });
});
