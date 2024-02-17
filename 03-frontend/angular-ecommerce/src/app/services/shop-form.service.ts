import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShopFormService {
  constructor() {}

  getCreditCardMonths(startMonth: number): Observable<number[]> {
    let data: number[] = [];

    //Build and array for month
    // Loop until month 12.
    //This makes it only display the remaining months

    for (let month = startMonth; month <= 12; month++) {
      data.push(month);
    }

    return of(data); // This will wrap and object as an Observable.
  }

  getCreditCardYears(): Observable<number[]> {
    let data: number[] = [];

    //build an array for "Year" for dropdown list.
    // - Start at current year and loop for 10 years.

    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;

    for (let year = startYear; year <= endYear; year++) {
      data.push(year);
    }
    return of(data);
  }
}
