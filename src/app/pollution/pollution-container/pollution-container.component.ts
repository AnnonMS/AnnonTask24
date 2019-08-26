import { Component } from '@angular/core';
import { ClearMessages } from '@appstore/messenger/messenger.actions';
import { ClearSearchAndStorage, InitFetchCities } from '@appstore/pollution/pollution.actions';
import { PollutionState, PollutionStateModel } from '@appstore/pollution/pollution.state';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SearchParams } from 'src/app/pollution/pollution';

@Component({
  selector: 'app-pollution-container',
  templateUrl: './pollution-container.component.html',
  styleUrls: ['./pollution-container.component.scss']
})
export class PollutionContainerComponent {

  @Select(PollutionState.getState) public state$: Observable<PollutionStateModel>;

  constructor(public store: Store) { }

  clear() {
    this.store.dispatch(new ClearMessages());
    this.store.dispatch(new ClearSearchAndStorage());
  }

  search(data: SearchParams) {
    this.store.dispatch(new ClearMessages());
    this.store.dispatch(new InitFetchCities(data));
  }

}
