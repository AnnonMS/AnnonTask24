import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxsStoreModule } from '@appstore/store.module';
import { PollutionModule } from './../pollution.module';
import { PollutionContainerComponent } from './pollution-container.component';


describe('PollutionContainerComponent', () => {
  let component: PollutionContainerComponent;
  let fixture: ComponentFixture<PollutionContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PollutionModule, NgxsStoreModule]
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
