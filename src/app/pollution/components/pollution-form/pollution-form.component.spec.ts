import { async, ComponentFixture, TestBed } from '@angular/core/testing';
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
