import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PollutionFormComponent } from './pollution-form.component';

describe('PollutionFormComponent', () => {
  let component: PollutionFormComponent;
  let fixture: ComponentFixture<PollutionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PollutionFormComponent ]
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
