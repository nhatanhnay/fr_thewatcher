import { Component, OnInit } from '@angular/core';
import { DataService } from '../functions/search';
import { WatchDetails } from '../models/watch-details.model';
import { ActivatedRoute } from '@angular/router';
import { ProductComponent } from '../product/product.component';
import { Observable, BehaviorSubject, firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ProductComponent, CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  public searchText: string | undefined;
  public watchDetails: WatchDetails[] | undefined;
  public get totalPages(): number {
    return this.watchDetails ? Math.ceil(this.watchDetails.length / this.pageSize) : 0;
  }
  private watchDetailsSubject: BehaviorSubject<WatchDetails[]> = new BehaviorSubject<WatchDetails[]>([]);
  public paginatedWatchDetails$: Observable<WatchDetails[]> = this.watchDetailsSubject.asObservable();
  private pageSize = 12;
  public page = 1;
  constructor (private dataService: DataService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const name = params.get('name');
      this.searchText = name !== null ? name : undefined;
      if (this.searchText) {
        this.getWatchDetail(this.searchText);
      }
    });
  }

  async getWatchDetail(name: string): Promise<void> {
    try {
      const data = await firstValueFrom(this.dataService.searchWatch(name));
      this.watchDetails = data;
      this.updatePaginatedWatchDetails();
    } catch (error) {
      console.error('Error fetching watch details:', error);
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
    const paginatedItems = this.watchDetails ? this.watchDetails.slice(start, end) : [];
    this.watchDetailsSubject.next(paginatedItems);
  }
}
