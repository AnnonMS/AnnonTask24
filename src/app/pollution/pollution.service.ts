import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddMessage } from '@appstore/messenger/messenger.actions';
import { HideLoader } from '@appstore/pollution/pollution.actions';
import { Store } from '@ngxs/store';
import { map } from 'rxjs/operators';
import { MessageType } from '../messenger/message';
import { City, CityDescWikiResponse, Measurements, Result, SearchParams } from './pollution';

@Injectable({
  providedIn: 'root'
})
export class PollutionService {

  constructor(private http: HttpClient, private store: Store) { }


  /*
    @param iso: required - to call openaq API and get cities we need ISO Code of the country
    @param search: required including iso country code and selected parameter (pm25, pm10 ,o3) to fetch data;
  */

  async getCities(search: SearchParams): Promise<string[]> {
    let items: string[] = [];
    let page = 1;
    // 3600000 - 1 hours in millisecond * 24 hours;
    const lasthours = new Date(Date.now() - (3600000 * 24)).toISOString();

    // call Api till we have atleast 10 unique cities, wait for Promise to count array length
    // to prevent infity loop, stop requesting api after 20 pages, and return uncomplited list of cities

    while ((items.length < 10) || (page > 20)) {
      if (items[items.length - 1] === `No more measurements from last 24 hours for ${search.param}`) {
        break;
      } else {
        const data = await this.getCitiesFromPage(search.country, search.param, page, lasthours, items);
        items = [...items, ...data];
        page++;
      }
    }

    // in case we get more cities from the last request to api, return only first 10

    return items.slice(0, 10);
  }

  /*
    @param iso: required - to call openaq API and get cities we need ISO Code of the country;
    @param page: required - we use pagination to only request minimal ammount of nodes from API to generate 10 unique cities;
    @param currentCities: - containing unique cities from previous request, to not duplicate them
  */

  getCitiesFromPage(iso: string, param: string, page: number, lasthours: string, currentCities: string[]): Promise<string[]> {

    const params = new HttpParams({
      fromObject: {
        country: iso, // Limit results by a certain country, based on iso code.
        parameter: param, // Limit to only a certain parameter (allowed values: pm25, pm10, so2, no2, o3, co, bc)
        order_by: 'value', // order by measurements, parameter value (µg/m3)
        has_geo: 'true', // Filter out items that do not have geographic information
        limit: '50', // Change the number of results returned (default: 100)
        page: page.toString(), // use Page in case we need to request more records to generate 10 cities
        sort: 'desc', // sort from highest to lowest values
        date_from: lasthours
      }
    });

    const api = `https://api.openaq.org/v1/measurements`;

    return this.http.get<Measurements>(api, { params }).pipe(
      map((res: Measurements) => {

        const results = res.results;
        let uniqueCities: string[];

        if (results.length) {
          uniqueCities = res.results
            .map((result: Result) => this.fixCityname(result.city)) // return only city names from array and pass it throught city names fix function
            .filter((city, index, cities) => cities.indexOf(city) === index) // return only unique values from current Api request
            .filter((ucity) => currentCities.indexOf(ucity) === -1); // return only unique values from all Api request
        } else {
          uniqueCities = [...currentCities, `No more measurements from last 24 hours for ${param}`];
        }
        return uniqueCities;
      }),
    ).toPromise().catch((error) => this.handleError(error));
  }


  fixCityname(name: string) {
    const fixedname = name.toLowerCase();
    return fixedname.includes('/', 0) ? fixedname.substr(0, fixedname.indexOf('/')) : fixedname;
  }


  async getCityDescriptions(data: string[]): Promise<City[]> {

    const cities: Promise<City>[] = data.map((city) => this.getCityDescription(city));
    const allCities = await Promise.all(cities).catch((error) => this.handleError(error));

    return allCities;
  }


  async getCityDescription(name: string): Promise<City> {
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

        const { extract, title, description } = pages[pageid];
        const city: City = {
          description,
          extract: extract ? extract : 'Description not found',
          title
        };

        return city;
      })
    ).toPromise().catch((error) => this.handleError(error));
  }




  private handleError(error: Error): Promise<any> {

    this.store.dispatch(new AddMessage({
      type: MessageType.error,
      desc: error.message
    }));

    this.store.dispatch(new HideLoader());

    return Promise.reject(error.message || error);
  }

}
