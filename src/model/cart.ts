import {Product} from './product';
import * as Collections from 'typescript-collections';
import {HasOverview} from '../util/overview';

export interface Cart {
  add(product: Product, amount: number): void;
  remove(product: Product, amount: number): void;
  getUniqueCount(): number;
  getTotalCount(): number;
  getCartItems(): Collections.Dictionary<Product, number>;
  getProductAmount(product: Product): number;
  updateProductAmount(product: Product, newAmount: number): void;
  updateProductPrice(product: Product, price: number): void;
  clone(): Cart;
}

/**
 * This class keeps track of the items in the cart a shopping session.
 * Every product present in the cart is at least once.
 * The modifications in the cart are done via add/remove methods, no direct modification of the
 * internal items is allowed.
 *
 * Updates to the content is also allowed via update methods (for price and product)
 *
 * @see add
 * @see remove
 */
export class Cart implements Cart, HasOverview {
  protected cartItems: Collections.Dictionary<Product, number>;

  constructor() {
    this.cartItems = new Collections.Dictionary<Product, number>();
  }

  /**
   * Adds a product to the cart - or the given amount if the SKU already exists
   * @param product Product to handle
   * @param amount amount to add to the cart (will be added to the existing, if the item is already present)
   */
  public add(product: Product, amount: number): void {
    let newAmount = amount;
    if (this.cartItems.containsKey(product)) {
      const oldAmount = this.cartItems.getValue(product) as number;
      newAmount = oldAmount + newAmount;
    }
    this.cartItems.setValue(product, newAmount);
  }

  /**
   * Removes products from the cart - if they exist
   * It's not allowed to have negative amounts in the cart.
   * @param product Product to handle
   * @param amount amount to substract from the cart
   */
  public remove(product: Product, amount: number): void {
    if (this.cartItems.containsKey(product)) {
      const oldAmount = this.cartItems.getValue(product) as number;
      const newAmount = oldAmount - amount >= 0 ? oldAmount - amount : 0;

      this.updateProductAmount(product, newAmount);
    }
  }

  /**
   * Returns the total amount of items (different SKUs) in the cart
   */
  public getUniqueCount(): number {
    return this.cartItems.size();
  }

  /**
   * Returns the total count of articles in the cart
   */
  public getTotalCount(): number {
    let totalCount = 0;
    this.cartItems.forEach((product, amount) => {
      totalCount = totalCount + amount;
    });
    return totalCount;
  }

  /**
   * Returns the contents in the cart
   */
  public getCartItems(): Collections.Dictionary<Product, number> {
    return this.cartItems;
  }

  /**
   * Returns the amount of a given product in the cart
   * @param product
   */
  public getProductAmount(product: Product): number {
    if (this.cartItems.containsKey(product)) {
      return this.cartItems.getValue(product) as number;
    } else {
      return 0;
    }
  }

  /**
   * Updates the amount of a product in the cart
   * @param product to edit
   * @param amount to set in the given product
   */
  public updateProductAmount(product: Product, newAmount: number): void {
    if (newAmount > 0) {
      this.cartItems.setValue(product, newAmount);
    } else {
      this.cartItems.remove(product);
    }
  }

  /**
   * Modifies the price of a product in the cart
   * @param product to edit
   * @param price to set in the given product
   */
  public updateProductPrice(product: Product, price: number): void {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const amount = this.cartItems.getValue(product)!;
    this.cartItems.remove(product);
    product.price = price;
    this.cartItems.setValue(product, amount);
  }

  /**
   * Returns the total price without any promotion considered
   * @returns total price of the items in the cart
   */
  public getTotalPrice(): number {
    let totalPrice = 0;
    this.cartItems.forEach((product, amount) => {
      totalPrice = totalPrice + product.price * amount;
    });
    return totalPrice;
  }

  public hasProduct(product: Product): boolean {
    return this.getCartItems().containsKey(product);
  }

  /**
   * Provides a new instance of the class Cart with the same contents
   * The prototype will retain the same methods and cart contents
   * @returns (deep) copy of the instance
   */
  public clone(): Cart {
    const newCart = new Cart();
    this.cartItems.forEach((product, amount) => {
      newCart.add(product, amount);
    });
    return newCart;
  }

  /**
   * Overview of the content of the instance
   * @returns string with a quick overview of the contents
   */
  public getOverview(): string {
    let overview = '';
    this.cartItems.forEach((product, amount) => {
      overview += `\n${product.sku} x ${amount} (total ${
        product.price * amount
      })`;
    });
    return overview;
  }
}
