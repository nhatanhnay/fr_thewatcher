import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from '../product/product.component';
import { ShoppingCartService } from '../models/services';
import { FootBarComponent } from '../foot-bar/foot-bar.component';
import { DataService } from '../functions/data';
import { Observable, BehaviorSubject, firstValueFrom } from 'rxjs';
import { WatchDetails } from '../models/watch-details.model';

@Component({
  selector: 'app-market',
  standalone: true,
  imports: [ProductComponent, CommonModule, FootBarComponent],
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss']
})
export class MarketComponent implements OnInit {
  public page = 1;
  public watchDetails: WatchDetails[] = [];
  private pageSize = 12;
  public get totalPages(): number {
    return Math.ceil(this.watchDetails.length / this.pageSize);
  }
  private watchDetailsSubject: BehaviorSubject<WatchDetails[]> = new BehaviorSubject<WatchDetails[]>([]);
  public paginatedWatchDetails$: Observable<WatchDetails[]> = this.watchDetailsSubject.asObservable();

  constructor(private cartService: ShoppingCartService, private dataService: DataService) { }

  ngOnInit(): void {
    this.loadWatchDetails();
  }

  get cartQuantity(): number {
    return this.cartService.getCartQuantity();
  }

  async loadWatchDetails(): Promise<void> {
    try {
      const data = await firstValueFrom(this.dataService.getWatchDetails()); // Await the data
      this.watchDetails = data;
      this.updatePaginatedWatchDetails();
    } catch (error) {
      console.error('Error loading watch details:', error);
    }
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return; // Prevent going out of bounds
    this.page = page;
    this.updatePaginatedWatchDetails();
  }

  private updatePaginatedWatchDetails(): void {
    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;
    const paginatedItems = this.watchDetails.slice(start, end);
    this.watchDetailsSubject.next(paginatedItems);
  }
}
