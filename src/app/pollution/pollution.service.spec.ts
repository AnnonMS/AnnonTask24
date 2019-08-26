import { HttpParams, HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { NgxsStoreModule } from '@appstore/store.module';
import { SearchParams } from './pollution';
import { PollutionService } from './pollution.service';
import { POLAND_PM25_50_RECORDS, WIKIPEDIA_PAGES } from './pollution.service.mockdata';


describe('PollutionService', () => {
  let service: PollutionService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NgxsStoreModule],
      providers: [PollutionService]
    });
    service = TestBed.get(PollutionService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should remove slash and pick one city name', () => {
    const item = 'Valencia/València';
    const expected = 'Valencia';
    const result = service.fixCityname(item);
    expect(expected).toEqual(result);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  describe('#getCities', () => {

    afterEach(() => {
      httpMock.verify();
    });

    const search: SearchParams = {
      country: 'PL',
      param: 'pm25'
    };

    it('should return 10 cities from API with HttpParams', () => {

      const params = new HttpParams({
        fromObject: {
          country: search.country,
          parameter: search.param,
          order_by: 'value',
          has_geo: 'true',
          limit: '50',
          page: '1',
          sort: 'desc',
          date_from: new Date(Date.now() - (3600000 * 24)).toUTCString()
        }
      });

      service.getCities(search).then(cities => expect(cities.length).toEqual(10), fail);

      const req = httpMock.expectOne(request => request.url === 'https://api.openaq.org/v1/measurements');
      expect(req.request.method).toEqual('GET');
      expect(req.request.params).toEqual(params);

      req.flush(POLAND_PM25_50_RECORDS);

    });

    it('should return cities in order from most polluted to lowest', () => {

      const expected = ['Połaniec', 'Kraków', 'Kędzierzyn-Koźle', 'Suwałki', 'Goczałkowice-Zdrój', 'Katowice', 'Kalisz', 'Duszniki-Zdrój', 'Dębica', 'Tarnów'];
      service.getCities(search).then(cities => expect(cities).toEqual(expected), fail);
      const req = httpMock.expectOne((request: HttpRequest<any>) => request.url === 'https://api.openaq.org/v1/measurements');
      expect(req.request.method).toEqual('GET');
      req.flush(POLAND_PM25_50_RECORDS);
    });

    it('get City descriptions', () => {

      const api = 'https://en.wikipedia.org/w/api.php';
      const expected = ['Połaniec', 'Kraków', 'Kędzierzyn-Koźle', 'Suwałki', 'Goczałkowice-Zdrój', 'Katowice', 'Kalisz', 'Duszniki-Zdrój', 'Dębica', 'Tarnów'];
      service.getCityDescriptions(expected).then((res) => expect(res[0].extract).toContain('Połaniec'), fail);

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

    });

  });

});
