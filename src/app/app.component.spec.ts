import { async, TestBed } from '@angular/core/testing';
import { NgxsStoreModule } from '@appstore/store.module';
import { AppComponent } from './app.component';
import { PollutionModule } from './pollution/pollution.module';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        PollutionModule,
        NgxsStoreModule
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

});
