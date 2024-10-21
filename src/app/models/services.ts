// src/app/services/shopping-cart.service.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';

interface CartItem {
  id: number;
  name: string;
  price: number;
  urlImage: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private cart: CartItem[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.loadCart();
  }

  addToCart(item: CartItem) {
    const existingItem = this.cart.find(cartItem => cartItem.id=== item.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      item.quantity = 1;
      this.cart.push(item);
    }

    this.saveCart();
    console.log('Giỏ hàng hiện tại:', this.cart);
  }

  getCartItems() {
    return this.cart;
  }

  removeAllCart() {
    this.cart = [];
    this.saveCart();
  }

  sumTotal() {
    return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  getCartQuantity(): number {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }

  private saveCart() {
    if (isPlatformBrowser(this.platformId)) { // Kiểm tra nếu là browser
      localStorage.setItem('shoppingCart', JSON.stringify(this.cart));
    }
  }

  private loadCart() {
    if (isPlatformBrowser(this.platformId)) { // Kiểm tra nếu là browser
      const storedCart = localStorage.getItem('shoppingCart');
      if (storedCart) {
        this.cart = JSON.parse(storedCart);
      }
    }
  }
  
  removeFromCart(id: number) {
    this.cart = this.cart.filter(item => item.id !== id);
    this.saveCart(); // Lưu lại giỏ hàng sau khi xoá
  }
}


