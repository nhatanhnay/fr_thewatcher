import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartService } from '../models/services';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  @Input() urlImage: string = '';
  @Input() name: string = '';
  @Input() price: number = 0;
  @Input() rating: number = 0;
  @Input() numberRating: number = 0;
  @Input() linkHref: string = '';
  @Input() id: number = 0;

  isClicked = false;

  constructor(private cartService: ShoppingCartService) {}

  addToCart() {
    this.cartService.addToCart({
      id: this.id,
      name: this.name,
      price: this.price,
      urlImage: this.urlImage,
      quantity: 1
    });
    console.log(`Thêm sản phẩm ${this.name} vào giỏ hàng với giá $${this.price.toFixed(2)}`);

    this.isClicked = true;

    setTimeout(() => {
      this.isClicked = false;
    }, 300);
  }
}
