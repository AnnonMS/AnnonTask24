import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { City } from './pollution';
import { PollutionService } from './pollution.service';


describe('PollutionService', () => {
  let service: PollutionService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PollutionService]
    });
    service = TestBed.get(PollutionService);
  });

  it('should remove slash and pick one city name', () => {
    const item = 'Valencia/València';
    const expected = 'Valencia';
    const result = service.fixCityname(item);
    expect(expected).toEqual(result);
  });

  it('should be created', () => {
    const mockData: City[] = [
      { title: 'Kraków', description: '', extract: '' },
      { title: 'Połaniec', description: '', extract: '' },
      { title: 'Jawor', description: '', extract: '' },
      { title: 'Wschowa', description: '', extract: '' },
      { title: 'Toruń', description: '', extract: '' },
      { title: 'Zgierz', description: '', extract: '' },
      { title: 'Szczecin', description: '', extract: '' },
      { title: 'Starachowice', description: '', extract: '' },
      { title: 'Tarnów', description: '', extract: '' },
      { title: 'Przemyśl', description: '', extract: '' },
    ];
    expect(service).toBeTruthy();
  });
});
