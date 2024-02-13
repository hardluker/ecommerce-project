import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  //Initializing an array to contain the "list" of products
  products: Product[] = [];
  //Initializing the current category id for routing.
  currentCategoryId: number = 1;

  //Constructor to initialze a product service and active route
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  //On post construct, subscribing on the param map for given route.
  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  //This method calls the service to return the stream of data.
  //The data is received and the array is populated with this data.
  listProducts() {
    // check if "id" parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      //get the "id" param string. convert string to a number using the + symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    } else {
      // not category id available .... default to category 1
      this.currentCategoryId = 1;
    }
    //Now get the products for the given category id
    this.productService
      .getProductList(this.currentCategoryId)
      .subscribe((data) => {
        this.products = data;
      });
  }
}
