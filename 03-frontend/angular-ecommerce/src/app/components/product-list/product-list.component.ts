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
  previousCategoryId: number = 1;
  currentCategoryId: number = 1;
  searchMode: boolean = false;

  //Properties for pagination
  pageNumber: number = 1;
  pageSize: number = 10;
  totalElements: number = 0;

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
    //Enables search mode if the route has a parameter 'keyword'.
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  handleSearchProducts() {
    //Storing the keyword in a string.
    const keyword: string = this.route.snapshot.paramMap.get('keyword')!;

    //Now search for products with the given keyword.
    this.productService.searchProducts(keyword).subscribe((data) => {
      this.products = data;
    });
  }

  handleListProducts() {
    // check if "id" parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      //get the "id" param string. convert string to a number using the + symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    } else {
      // not category id available .... default to category 1
      this.currentCategoryId = 1;
    }

    //
    //Check if there is a different category than previous
    //Angular will reuse a component if it is currently being viewed
    //

    // if we have a different category id than previous
    // set pagenumber back to 1

    if (this.previousCategoryId != this.currentCategoryId) {
      this.pageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;
    console.log(
      `currentCategoryId=${this.currentCategoryId}, pageNumber=${this.pageNumber}`
    );

    //Now get the products for the given category id, page number and page size
    //Spring boot uses 0-based and angular uses 1-based in this context.
    //Thus, having to account for that.
    this.productService
      .getProductListPaginate(
        this.pageNumber - 1,
        this.pageSize,
        this.currentCategoryId
      )
      .subscribe((data) => {
        this.products = data._embedded.products;
        this.pageNumber = data.page.number + 1;
        this.pageSize = data.page.size;
        this.totalElements = data.page.totalElements;
      });
  }
}
