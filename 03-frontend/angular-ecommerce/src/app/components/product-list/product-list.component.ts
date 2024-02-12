import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  //Initializing an array to contain the "list" of products
  products: Product[] = [];

  //Constructor to initialze a product service.
  constructor(private productService: ProductService) {}

  //Run the listProducts methon on post Construct
  ngOnInit(): void {
    this.listProducts();
  }

  //This method calls the service to return the stream of data.
  //The data is received and the array is populated with this data.
  listProducts() {
    this.productService.getProductList().subscribe((data) => {
      this.products = data;
    });
  }
}
