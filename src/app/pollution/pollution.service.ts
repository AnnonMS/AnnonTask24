import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { City, Measurements, Result } from './pollution';

@Injectable({
  providedIn: 'root'
})
export class PollutionService {

  constructor(private http: HttpClient) { }

  getCities(iso: string, page: number): Observable<string[]> {

    const params = new HttpParams({
      fromObject: {
        country: iso,
        order_by: 'measurements[0].value',
        parameter: 'pm25',
        limit: '25',
        page: page.toString(),
        sort: 'desc',
      }
    });

    const api = `https://api.openaq.org/v1/latest`;
    return this.http.get<Measurements>(api, {
      params
    }).pipe(
      map((res: Measurements) => {
        const uniqueCities: string[] = res.results
          .map((result: Result) => result.city) // return only city names from array
          .filter((city, i, cities) => cities.indexOf(city) === i);
        return uniqueCities;
      }),
    );
  }

  getCityDescription(data: City[]) {

    const titles = this.createTitles(data);
    const params = new HttpParams({
      fromObject: {
        action: 'query',
        prop: ['extracts', 'exintro', 'explaintext'],
        format: ['json', 'redirects'],
        callback: '?',
        titles,
      }
    });

    const api = `https://en.wikipedia.org/w/api.php?`;

    return this.http.get<Measurements>(api, { params }).pipe(
      map((res: any) => {
        console.dir(res);
        return res;
      })
    );

  }

  /*
    createTitles - use to create query string for wikipedia API By name using the titles parameter, e.g. titles=Foo|Bar|Main_Page
    @params data - Araray od cities;
  */

  createTitles(data: City[]): string {
    const titles = data.reduce((prev, current) => {
      prev = prev !== '' ? prev + '|' : prev;
      return prev + current.name;
    }, '');
    return titles;
  }

  private handleError<T>(message: string, result?: T) {
    return (error: any): Observable<T> => {
      console.error(`error ${error.message}`);
      return of(result as T);
    };
  }

}
