import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: CartItem[] = [];

  //A subject is a multicast implemenation of observable. Meaning each observer observes the same data instead of an independent copy.
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  addToCart(cartItem: CartItem) {
    //Check if we already have item in cart.
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem | undefined = undefined;

    //find the item in cart based on item id.
    if (this.cartItems.length > 0) {
      existingCartItem = this.cartItems.find(
        (tempCartItem) => tempCartItem.id === cartItem.id
      );
    }

    //check if we found it in cart already
    alreadyExistsInCart = existingCartItem !== undefined;
    if (alreadyExistsInCart && existingCartItem) {
      //If so, increase quantity
      existingCartItem.quantity++;
    } else {
      // just add the item to the array
      this.cartItems.push(cartItem);
    }

    //compute cart total price and quantity, store in variables
    this.computeCartTotals();
  }

  removeFromCart(cartItem: CartItem) {
    //Find the index of the item to remove.
    const indexOfItemToRemove = this.cartItems.findIndex(
      (tempCartItem) => tempCartItem.id == cartItem.id
    );

    //Remove the item from the array.
    if (indexOfItemToRemove > -1) {
      this.cartItems.splice(indexOfItemToRemove, 1);
    }
  }

  decreaseQuantity(cartItem: CartItem) {
    cartItem.quantity--;
    if (cartItem.quantity === 0) {
      this.removeFromCart(cartItem);
    } else {
      this.computeCartTotals();
    }
  }
  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    //Publish the new values, all subscribers will receive the new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    // log cart data just for debuggin purposes
    this.logCartData(totalPriceValue, totalQuantityValue);
  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log('Contents of the cart:');
    for (let tempCartItem of this.cartItems) {
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
      console.log(
        `Name: ${tempCartItem.name}, Quantity: ${tempCartItem.quantity}, UnitPrice: ${tempCartItem.unitPrice}`
      );
    }
    console.log(
      `totalPrice: ${totalPriceValue.toFixed(
        2
      )}, totalQuantity: ${totalQuantityValue}`
    );
    console.log('------');
  }
}
