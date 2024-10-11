import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductComponent } from './product/product.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FootBarComponent } from './foot-bar/foot-bar.component';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, ProductComponent, NavBarComponent, FootBarComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'frontend';
  showFootBar: boolean = true;

  constructor(private router: Router) {
      // Subscribe to NavigationEnd events to check the current route
      this.router.events
          .pipe(filter(event => event instanceof NavigationEnd))
          .subscribe(() => {
              this.showFootBar = this.router.url !== '/checkout';
          });
  }
}
