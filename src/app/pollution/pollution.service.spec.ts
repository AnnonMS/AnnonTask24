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

  fit('should have create proper titles string', () => {

    const mockData: City[] = [
      { name: 'Kraków', description: '' },
      { name: 'Połaniec', description: '' },
      { name: 'Jawor', description: '' },
      { name: 'Wschowa', description: '' },
      { name: 'Toruń', description: '' },
      { name: 'Zgierz', description: '' },
      { name: 'Szczecin', description: '' },
      { name: 'Starachowice', description: '' },
      { name: 'Tarnów', description: '' },
      { name: 'Przemyśl', description: '' },
    ];

    const expecting = 'Kraków|Połaniec|Jawor|Wschowa|Toruń|Zgierz|Szczecin|Starachowice|Tarnów|Przemyśl';
    const result = service.createTitles(mockData);

    expect(result).toEqual(expecting);

  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
