import { Component } from '@angular/core';
import { ProductCategory } from '../../common/product-category';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrl: './product-category-menu.component.css',
})
export class ProductCategoryMenuComponent {
  //Creating an array for holding categories.
  productCategories: ProductCategory[] = [];

  //Injecting productservice
  constructor(private productService: ProductService) {}

  //Post construct, call the method.
  ngOnInit() {
    this.listProductCategories();
  }

  //This method will gather the data for the product category.
  //It also logs to the console.
  //Finally, it inputs the data into the productcategory array.
  listProductCategories() {
    this.productService.getProductCategories().subscribe((data) => {
      console.log('Product Categories=' + JSON.stringify(data));
      this.productCategories = data;
    });
  }
}
