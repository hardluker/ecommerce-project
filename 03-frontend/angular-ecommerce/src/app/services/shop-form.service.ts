import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { Country } from '../common/country';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root',
})
export class ShopFormService {
  private countriesUrl = 'http://localhost:8080/api/countries';
  private statesUrl = 'http://localhost:8080/api/states';

  constructor(private httpClient: HttpClient) {}

  //Method to map json response for countries into an observable array of Country.
  getCountries(): Observable<Country[]> {
    return this.httpClient
      .get<GetResponseCountries>(this.countriesUrl)
      .pipe(map((response) => response._embedded.countries));
  }

  //Method to map json response for countries into an observable array of Country.
  getStates(countryCode: string): Observable<State[]> {
    //Search Url
    const searchStatesUrl = `${this.statesUrl}/search/findByCountryCode?code=${countryCode}`;

    return this.httpClient
      .get<GetResponseStates>(searchStatesUrl)
      .pipe(map((response) => response._embedded.states));
  }

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

//Interface to unwrap JSON from REST _embedded entry for countries
interface GetResponseCountries {
  _embedded: {
    countries: Country[];
  };
}

//Interface to unwrap JSON from REST _embedded entry states
interface GetResponseStates {
  _embedded: {
    states: State[];
  };
}
