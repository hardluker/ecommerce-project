import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Purchase } from '../common/purchase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private purchaseUrl = 'http://localhost:8080/api/checkout/purchase';

  constructor(private httpClient: HttpClient) {}

  //passing the purchase through the POST.
  //JSON is created automatically.
  placeOrder(purchase: Purchase): Observable<any> {
    return this.httpClient.post<Purchase>(this.purchaseUrl, purchase);
  }
}
