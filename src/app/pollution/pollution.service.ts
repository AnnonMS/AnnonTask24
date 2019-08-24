import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { City, CityDescWikiResponse, Measurements, Result } from './pollution';

@Injectable({
  providedIn: 'root'
})
export class PollutionService {

  constructor(private http: HttpClient) { }


  /*
    @param iso: required - to call openaq API and get cities we need ISO Code of the country, we will pass the iso value to other function
  */

  async getCities(iso: string): Promise<City[]> {
    let items: City[] = [];
    let page = 1;

    // call Api till we have atleast 10 unique cities, wait for Promise to count array length

    while (items.length < 10) {
      const data = await this.getCitiesFromPage(iso, page);
      items = [...items, ...data];
      page++;
    };

    // in case we get more cities from the last request to api, return only first 10

    return items.slice(0, 10);
  }

  /*
    @param iso: required - to call openaq API and get cities we need ISO Code of the country;
    @param page: required - we use pagination to only request minimal ammount of nodes from API to generate 10 unique cities;
  */

  getCitiesFromPage(iso: string, page: number): Promise<City[]> {
    const params = new HttpParams({
      fromObject: {
        country: iso, // Limit results by a certain country, based on iso code.
        parameter: 'pm25', // Limit to only a certain parameter (allowed values: pm25, pm10, so2, no2, o3, co, bc)
        order_by: 'measurements[0].value', // order by measurements, parameter value (µg/m3)
        limit: '10', // Change the number of results returned (default: 100)
        page: page.toString(), // use Page in case we need to request more records to generate 10 cities
        sort: 'desc', // sort from highest to lowest values
      }
    });
    const api = `https://api.openaq.org/v1/latest`;

    return this.http.get<Measurements>(api, { params }).pipe(
      map((res: Measurements) => {
        const uniqueCities: City[] = res.results
          .map((result: Result) => result.city) // return only city names from array
          .filter((city, index, cities) => cities.indexOf(city) === index) // return only unique values
          .map((name) => ({ name, description: '' })); // create City object and fill with empty desc
        return uniqueCities;
      }),
    ).toPromise();
  }



  async getCityDescriptions(data: City[]): Promise<City[]> {

    let cities: Promise<City>[] = [];

    for (const city of data) {
      const promise = this.getCityDescription(city.name);
      cities = [...cities, promise];
    }

    const allCities = await Promise.all(cities);

    return allCities;
  }


  async getCityDescription(name: string) {
    const params = new HttpParams({
      fromObject: {
        action: 'query', // Fetch data from MediaWik
        prop: 'extracts|description', // Returns plain-text or limited HTML extracts of the given pages.
        exintro: '', // Return only content before the first section.
        explaintext: '', // Return extracts as plain text instead of limited HTML.
        format: 'json',
        redirects: '', // Returns all redirects to the given pages, example warszawa is transalted to warsaw foe englih version of page
        titles: name,
        origin: '*'
      }
    });
    const api = `https://en.wikipedia.org/w/api.php`;

    return this.http.get<CityDescWikiResponse>(api, { params }).pipe(
      map((res) => {

        const pages = res.query.pages;
        const pageid = Object.keys(pages)[0];

        const { extract, title } = pages[pageid];
        const description = extract ? extract : 'Description not found';
        const city: City = { description, name: title };

        return city;
      })
    ).toPromise();
  }


  private handleError<T>(message: string, result?: T) {
    return (error: any): Observable<T> => {
      console.error(`error ${error.message}`);
      return of(result as T);
    };
  }

}
