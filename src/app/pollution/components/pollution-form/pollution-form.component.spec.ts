import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl } from '@angular/forms';
import { PollutionModule } from './../../pollution.module';
import { PollutionFormComponent } from './pollution-form.component';


describe('PollutionFormComponent', () => {
  let component: PollutionFormComponent;
  let fixture: ComponentFixture<PollutionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PollutionModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PollutionFormComponent);
    component = fixture.componentInstance;

    component.defaultValue = {
      param: 'pm25',
      country: ''
    };

    component.allowedCountries = [
      { name: 'Poland', iso: 'PL' },
      { name: 'Germany', iso: 'DE' },
      { name: 'Spain', iso: 'ES' },
      { name: 'France', iso: 'FR' }
    ];

    component.allowedParameters = [
      { name: 'pm2.5', value: 'pm25' },
      { name: 'pm10', value: 'pm10' },
      { name: 'Ozone', value: 'o3' }
    ];

    fixture.detectChanges();

  });

  describe('Form input', () => {

    let country: AbstractControl;

    beforeEach(() => {
      country = component.searchForm.controls.country;
      fixture.detectChanges();
    });

    it('should have input field for a country name', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('input[name="country"]')).toBeTruthy();
    });

    it('should fail for other countries then Poland, Germany, Spain and France', () => {
      country.setValue('Italy');
      expect(component.searchForm.valid).toBeFalsy();
      country.setValue('Polands');
      expect(component.searchForm.valid).toBeFalsy();
    });


    it('should work for Poland, Germany, Spain and France', () => {

      const allowed = component.allowedCountries.map((value) => value.name);

      for (const contrynName of allowed) {
        country.setValue(contrynName);
        expect(component.searchForm.valid).toBeTruthy();
        country.setValue(contrynName.toUpperCase());
        expect(component.searchForm.valid).toBeTruthy();
        country.setValue(contrynName.toLowerCase());
        expect(component.searchForm.valid).toBeTruthy();
      }

    });

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
