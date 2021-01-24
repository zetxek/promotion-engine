import {Cart} from '../model/cart/cart';

export interface CartPriceCalculator {
  getTotalPrice(cart: Cart): number;
}

export class BasicCartPriceCalculator {
  /**
   * Returns the total price without any promotion considered
   * @returns total price of the items in the cart
   */
  public getTotalPrice(cart: Cart): number {
    let totalPrice = 0;
    cart.getCartItems().forEach((product, amount) => {
      totalPrice = totalPrice + product.price * amount;
    });
    return totalPrice;
  }
}
