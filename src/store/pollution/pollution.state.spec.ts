import { async, TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { PollutionState } from './pollution.state';

describe('Pollution store', () => {
  let store: Store;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([PollutionState])]
    }).compileComponents();
    store = TestBed.get(Store);
  }));

});
