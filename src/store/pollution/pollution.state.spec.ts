import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { SearchParams } from 'src/app/pollution/pollution';
import { POLAND_PM25_50_RECORDS, WIKIPEDIA_PAGES } from 'src/app/pollution/pollution.service.mockdata';
import { CheckStorage, ClearSearchAndStorage, FetchCities, FetchCitiesDescription, SaveToStorage } from './pollution.actions';
import { PollutionState } from './pollution.state';

let storage = {};
const mockLocalStorage = {
  getItem: (key: string): string => {
    return key in storage ? storage[key] : null;
  },
  setItem: (key: string, value: string) => {
    storage[key] = `${value}`;
  },
  removeItem: (key: string) => {
    delete storage[key];
  },
  clear: () => {
    storage = {};
  }
};

describe('Pollution store', () => {
  let store: Store;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([PollutionState]), HttpClientTestingModule]
    }).compileComponents();
    store = TestBed.get(Store);
    httpMock = TestBed.get(HttpTestingController);

    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem').and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear').and.callFake(mockLocalStorage.clear);
  }));


  describe('local storage', () => {

    let searchmock: SearchParams;

    beforeEach(() => {
      searchmock = { country: 'Poland', param: 'pm25' };
      store.dispatch(new SaveToStorage(searchmock));
    });

    it('should call CheckStorage on store init, to check if last search values are present and assign them to store state', () => {
      store.dispatch(new CheckStorage());
      const actual = store.selectSnapshot(PollutionState.getState).lastSearch;
      expect(actual).toEqual(searchmock);
    });


    it('should call SaveToStorage to save country and parameter after form submit to local storage, to make it persistent between page reloads', () => {
      expect(localStorage.getItem('lastSearchCountry')).toEqual(searchmock.country);
      expect(localStorage.getItem('lastSearchParam')).toEqual(searchmock.param);

      const actual = store.selectSnapshot(PollutionState.getState).lastSearch;
      expect(actual).toEqual(searchmock);
    });

    it('should call ClearSearchAndStorage to clear local storage and reset state to default values', () => {
      store.dispatch(new ClearSearchAndStorage());
      expect(localStorage.getItem('lastSearchCountry')).toEqual(null);
      expect(localStorage.getItem('lastSearchParam')).toEqual(null);
      const actual = store.selectSnapshot(PollutionState.getState).lastSearch;
      const expected: SearchParams = { country: '', param: 'pm25' };
      expect(actual).toEqual(expected);
    });
  });

  describe('Fetching data', () => {

    let searchmock: SearchParams;

    beforeEach(() => {
      searchmock = { country: 'Poland', param: 'pm25' };
    });

    it('should fetch and save 10 cities in store from https://api.openaq.org/v1/measurements', async(() => {
      store.dispatch(new FetchCities(searchmock)).toPromise().then(() => {
        const actual = store.selectSnapshot(PollutionState.getState).citynames;
        expect(actual.length).toEqual(10);

        // TODO: Write better tests
      });

      const req = httpMock.expectOne(request => request.url === 'https://api.openaq.org/v1/measurements'); req.flush(POLAND_PM25_50_RECORDS);
    }));

    it('should fetch description from https://en.wikipedia.org/w/api.php', async(() => {

      const expected = ['Połaniec', 'Kraków', 'Kędzierzyn-Koźle', 'Suwałki', 'Goczałkowice-Zdrój', 'Katowice', 'Kalisz', 'Duszniki-Zdrój', 'Dębica', 'Tarnów'];

      store.dispatch(new FetchCitiesDescription(expected)).toPromise().then(() => {
        const actual = store.selectSnapshot(PollutionState.getState).cities;
        expect(actual.length).toEqual(10);
        expect(actual[0].extract).toBeDefined();

        // TODO: Write better tests
      });

      const api = 'https://en.wikipedia.org/w/api.php';
      const reqPage0 = httpMock.expectOne(request => request.url === api && (request.params.get('titles') === expected[0])); reqPage0.flush(WIKIPEDIA_PAGES[0]);
      const reqPage1 = httpMock.expectOne(request => request.url === api && (request.params.get('titles') === expected[1])); reqPage1.flush(WIKIPEDIA_PAGES[1]);
      const reqPage2 = httpMock.expectOne(request => request.url === api && (request.params.get('titles') === expected[2])); reqPage2.flush(WIKIPEDIA_PAGES[2]);
      const reqPage3 = httpMock.expectOne(request => request.url === api && (request.params.get('titles') === expected[3])); reqPage3.flush(WIKIPEDIA_PAGES[3]);
      const reqPage4 = httpMock.expectOne(request => request.url === api && (request.params.get('titles') === expected[4])); reqPage4.flush(WIKIPEDIA_PAGES[4]);
      const reqPage5 = httpMock.expectOne(request => request.url === api && (request.params.get('titles') === expected[5])); reqPage5.flush(WIKIPEDIA_PAGES[5]);
      const reqPage6 = httpMock.expectOne(request => request.url === api && (request.params.get('titles') === expected[6])); reqPage6.flush(WIKIPEDIA_PAGES[6]);
      const reqPage7 = httpMock.expectOne(request => request.url === api && (request.params.get('titles') === expected[7])); reqPage7.flush(WIKIPEDIA_PAGES[7]);
      const reqPage8 = httpMock.expectOne(request => request.url === api && (request.params.get('titles') === expected[8])); reqPage8.flush(WIKIPEDIA_PAGES[8]);
      const reqPage9 = httpMock.expectOne(request => request.url === api && (request.params.get('titles') === expected[9])); reqPage9.flush(WIKIPEDIA_PAGES[9]);
      expect(reqPage0.request.method).toEqual('GET');

    }));

  });

});
