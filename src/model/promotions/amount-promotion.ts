import {Promotion} from './promotion';
import {Product} from '../product';
import {Cart} from '../cart/cart';

/**
 * this promotion time assigns a special price if the product is repeated
 * a specific amount of times
 */
export class AmountPromotion implements Promotion {
  protected product: Product;
  protected amount: number;
  protected discountedPrice: number;

  constructor(product: Product, amount: number, discountedPrice: number) {
    this.product = product;
    this.amount = amount;
    this.discountedPrice = discountedPrice;
  }

  /**
   * Overview of the content of the instance
   * @returns string with a quick overview of the contents
   */
  getOverview(): string {
    const overview = `Amount promotion: ${this.amount} x ${this.product.sku} = ${this.discountedPrice})`;
    return overview;
  }

  /**
   * Applies the discount to the cart, and returns the discount amount and the modified cart after the promotion
   * has been applied
   * @param cart
   * @returns number, cart discount applied and modified cart
   */
  calculateDiscount(cart: Cart): [number, Cart] {
    let discount = 0;
    if (cart.getCartItems().containsKey(this.product)) {
      const cartAmount = cart.getCartItems().getValue(this.product) as number;

      if (cartAmount >= this.amount) {
        const amountOfDiscountBundles = Math.floor(cartAmount / this.amount);
        const newPrice =
          amountOfDiscountBundles * this.discountedPrice +
          this.product.price *
            (cartAmount - amountOfDiscountBundles * this.amount);
        const oldPrice =
          (cart.getCartItems().getValue(this.product) as number) *
          this.product.price;
        discount = oldPrice - newPrice;

        cart.updateProductAmount(
          this.product,
          cartAmount - amountOfDiscountBundles * this.amount
        );
      }
    }
    return [discount, cart];
  }

  /**
   * Checks if the required item is present in the cart in the required amount
   * @param cart cart to examine
   * @returns true if the promotion would be applicable
   */
  public isApplicable(cart: Cart): boolean {
    if (cart.getCartItems().containsKey(this.product)) {
      const cartAmount = cart.getCartItems().getValue(this.product) as number;
      return cartAmount >= this.amount;
    }

    return false;
  }
}
