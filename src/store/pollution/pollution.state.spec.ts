import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { PollutionState, PollutionStateModel } from './pollution.state';
import { PollutionAction } from './pollution.actions';

describe('Pollution store', () => {
  let store: Store;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([PollutionState])]
    }).compileComponents();
    store = TestBed.get(Store);
  }));

  it('should create an action and add an item', () => {
    const expected: PollutionStateModel = {
      items: ['item-1']
    };
    store.dispatch(new PollutionAction('item-1'));
    const actual = store.selectSnapshot(PollutionState.getState);
    expect(actual).toEqual(expected);
  });

});
