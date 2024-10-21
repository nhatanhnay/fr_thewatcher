import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MarketComponent } from './market/market.component';
import { HomeComponent } from './home/home.component';
import { ServicesComponent } from './services/services.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { BlogComponent} from './blog/blog.component'
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SearchComponent } from './search/search.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'market', component: MarketComponent, title: 'Market' },
  { path: 'home', component: HomeComponent, title: 'Home' },
  { path: 'services', component: ServicesComponent, title: 'Services' },
  { path: 'cart', component: CartComponent, title: 'Cart' },
  { path: 'checkout', component: CheckoutComponent, title: 'Checkout' },
  { path: 'aboutus', component: AboutUsComponent, title: 'About Us'},
  { path: 'blog', component: BlogComponent, title: 'Blog'},
  { path: 'product/:id', component: ProductDetailsComponent, title: 'Product Details' },
  { path: 'search/:name', component: SearchComponent, title: 'Search' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
