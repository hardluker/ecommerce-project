import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

//This allows for dependency injection
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  //base url for perform http methods on for products.
  private baseUrl = 'http://localhost:8080/api/products';

  //url for http methods on productcategories
  private categoryUrl = 'http://localhost:8080/api/product-category';

  //Constructor to initialize the HttpClient
  constructor(private httpClient: HttpClient) {}

  //This method performs the GET request and then
  //maps the response to an array.
  getProductList(theCategoryId: number): Observable<Product[]> {
    //Appending to url the endpoint to expose based on specific category ID.
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    //This is the actual response being received and mapped.
    return this.getProducts(searchUrl);
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient
      .get<GetResponseProductCategory>(this.categoryUrl)
      .pipe(map((response) => response._embedded.productCategory));
  }

  searchProducts(keyword: string): Observable<Product[]> {
    //Building url based on the keyword
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${keyword}`;

    //This is the actual response being received and mapped.
    return this.getProducts(searchUrl);
  }

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient
      .get<GetResponseProducts>(searchUrl)
      .pipe(map((response) => response._embedded.products));
  }

  getProduct(productId: number): Observable<Product> {
    //Build url based on product id.
    const productUrl = `${this.baseUrl}/${productId}`;

    return this.httpClient.get<Product>(productUrl);
  }
}

//This is used to define the structure of the response expected.
interface GetResponseProducts {
  _embedded: {
    products: Product[];
  };
}

//This is used to define the structure of the response expected.
// Something I ran into here. It is important that the _embedded sub item matches the collectionResourceRel = "productCategory" from the backend
//I had this as "productCategories" and was getting a null response.
interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  };
}
