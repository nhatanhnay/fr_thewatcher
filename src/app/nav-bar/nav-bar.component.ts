import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartService } from '../models/services';
import { DataService } from '../functions/search';
import { FormsModule } from '@angular/forms';
import { WatchDetails } from '../models/watch-details.model';
import { Observable, BehaviorSubject, firstValueFrom } from 'rxjs';
@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  searchText: string = ''
  constructor(private cartService: ShoppingCartService, private dataService: DataService) {}

  get cartQuantity(): number {
    return this.cartService.getCartQuantity();
  }

}
