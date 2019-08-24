import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PollutionAccordionComponent } from './pollution-accordion.component';

describe('PollutionAccordionComponent', () => {
  let component: PollutionAccordionComponent;
  let fixture: ComponentFixture<PollutionAccordionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PollutionAccordionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PollutionAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
