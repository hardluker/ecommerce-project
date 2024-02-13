import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product } from '../common/product';

//This allows for dependency injection
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  //base url for perform http methods on.
  private baseUrl = 'http://localhost:8080/api/products';

  //Constructor to initialize the HttpClient
  constructor(private httpClient: HttpClient) {}

  //This method performs the GET request and then
  //maps the response to an array.
  getProductList(theCategoryId: number): Observable<Product[]> {
    //Appending to url the endpoint to expose based on specific category ID.
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    //This is the actual response being received and mapped.
    return this.httpClient
      .get<GetResponse>(searchUrl)
      .pipe(map((response) => response._embedded.products));
  }
}

//This is used to define the structure of the response expected.
interface GetResponse {
  _embedded: {
    products: Product[];
  };
}
