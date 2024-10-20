import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../functions/details';
import { WatchDetails } from '../models/watch-details.model';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ShoppingCartService } from '../models/services';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  public id: number | undefined;
  public watchDetails: WatchDetails | undefined;
  public errorMessage: string | undefined;
  public safeDescription: SafeHtml | undefined;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private sanitizer: DomSanitizer,
    private cartService: ShoppingCartService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      this.id = idParam !== null && !isNaN(+idParam) && +idParam > 0 ? +idParam : undefined;

      if (this.id) {
        this.getWatchDetail(this.id);
      } else {
        this.errorMessage = 'ID sản phẩm không hợp lệ.';
      }
    });
  }

  getWatchDetail(id: number): void {
    this.dataService.getWatchDetail(id).subscribe(
      (data: WatchDetails[]) => {
        this.watchDetails = data[0];
        this.watchDetails.rating = Math.round(this.watchDetails.rating);
        console.log(this.watchDetails.rating);
        // Thay thế ký tự xuống dòng bằng <br>
        const formattedDescription = this.watchDetails.description.replace(/\n/g, '<br>');
        this.safeDescription = this.sanitizer.bypassSecurityTrustHtml(formattedDescription);
      },
      (error) => {
        this.errorMessage = 'Lỗi khi lấy thông tin sản phẩm.';
        console.error(error);
      }
    );
  }

  isClicked = false;

  addToCart() {
    if (this.id !== undefined) {
      this.cartService.addToCart({
        id: this.id,
        name: this.watchDetails?.name || 'Unknown',
        price: typeof this.watchDetails?.price === 'number' ? this.watchDetails.price : 0,
        urlImage: this.watchDetails?.image || 'Unknown',
        quantity: 1
      });
    }

    this.isClicked = true;

    setTimeout(() => {
      this.isClicked = false;
    }, 300);
  }
}