import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import {
  HttpClientModule,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';
import { ProductService } from './services/product.service';
import { RouterModule, Routes } from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';

//These are the routes for displaying information based on certain conditions within certain components.
const routes: Routes = [
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'search/:keyword', component: ProductListComponent },
  { path: 'category/:id', component: ProductListComponent },
  { path: 'category', component: ProductListComponent },
  { path: 'products', component: ProductListComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: '**', redirectTo: '/products', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
  ],
  providers: [
    provideClientHydration(),
    ProductService,
    provideHttpClient(withFetch()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
