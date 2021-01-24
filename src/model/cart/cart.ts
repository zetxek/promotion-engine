import * as Collections from 'typescript-collections';
import {Product} from '../product';

export interface Cart {
  add(product: Product, amount: number): void;
  remove(product: Product, amount: number): void;
  getUniqueCount(): number;
  getTotalCount(): number;
  getCartItems(): Collections.Dictionary<Product, number>;
  getProductAmount(product: Product): number;
  hasProduct(product: Product): boolean;
  updateProductAmount(product: Product, newAmount: number): void;
  updateProductPrice(product: Product, price: number): void;
  clone(): Cart;
}
