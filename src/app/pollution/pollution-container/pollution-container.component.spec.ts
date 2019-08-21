import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PollutionContainerComponent } from './pollution-container.component';

describe('PollutionContainerComponent', () => {
  let component: PollutionContainerComponent;
  let fixture: ComponentFixture<PollutionContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PollutionContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PollutionContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
