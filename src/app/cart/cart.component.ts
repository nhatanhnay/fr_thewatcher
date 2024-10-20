import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartService } from '../models/services';
import { CartItemComponent } from '../cart-item/cart-item.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, CartItemComponent],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  constructor(private cartService: ShoppingCartService) {}

  get cartQuantity(): number {
    return this.cartService.getCartQuantity();
  }

  get cartItems() {
    return this.cartService.getCartItems();
  }

  get totalPrice() {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  removeItem(id: number) {
    this.cartService.removeFromCart(id);
  }

  formatPrice(value: number): string {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Định dạng với dấu phân cách
  }
}
