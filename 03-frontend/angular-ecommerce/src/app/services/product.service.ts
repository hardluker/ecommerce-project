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
  //maps the response to an array. Automagically parsing the json!
  getProductList(): Observable<Product[]> {
    return this.httpClient
      .get<GetResponse>(this.baseUrl)
      .pipe(map((response) => response._embedded.products));
  }
}

//This is used to define the structure of the response expected.
interface GetResponse {
  _embedded: {
    products: Product[];
  };
}
