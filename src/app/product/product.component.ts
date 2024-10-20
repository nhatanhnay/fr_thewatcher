import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartService } from '../models/services';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  @Input() image: string = '';
  @Input() name: string = '';
  @Input() price: number = 0;
  @Input() rating: number = 0;
  @Input() numberRating: number = 0;
  @Input() href: string = '';
  @Input() id: number = 0;

  public linkDetail: string = '';
product: any;

  ngOnInit(): void {
    this.linkDetail = `/product-details/${this.id}`;
  }
  
  isClicked = false;

  constructor(private cartService: ShoppingCartService) {}

  formatPrice(value: number): string {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Định dạng với dấu phân cách
  }

  addToCart() {
    this.cartService.addToCart({
      id: this.id,
      name: this.name,
      price: this.price,
      urlImage: this.image,
      quantity: 1
    });
    console.log(`Thêm sản phẩm ${this.name} vào giỏ hàng với giá $${this.price.toFixed(2)}`);

    this.isClicked = true;

    setTimeout(() => {
      this.isClicked = false;
    }, 300);
  }
}
