import {Cart} from '../model/cart';
import {Promotion} from '../model/promotions/promotion';

export interface PromotionEngine {
  getDiscountedPrice(cart: Cart, promotions: Promotion[]): number;
}

export class DefaultPromotionEngine {
  public getDiscountedPrice(cart: Cart, promotions: Promotion[]): number {
    let discount = 0;
    let discountedCart = cart.clone();

    promotions.forEach(promotion => {
      if (promotion.isApplicable(discountedCart)) {
        const promotionResult = promotion.calculateDiscount(discountedCart);
        discount = discount + promotionResult[0];
        discountedCart = promotionResult[1];
      }
    });

    return discount;
  }
}
