import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartService } from '../models/services';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss'
})
export class CartItemComponent {
  @Input() id: number = 0;
  @Input() name: string = '';
  @Input() price: number = 0;
  @Input() urlImage: string = '';
  @Input() quantity: number = 0;

  constructor(private cartService: ShoppingCartService) {}

  get cartItems() {
    return this.cartService.getCartItems();
  }

  get sumPrice() {
    return this.price * this.quantity;
  }

  formatPrice(value: number): string {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Định dạng với dấu phân cách
  }

  removeItem(id: number) {
    this.cartService.removeFromCart(id);
  }
}
