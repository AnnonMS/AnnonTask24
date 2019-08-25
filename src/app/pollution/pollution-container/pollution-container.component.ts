import { Component } from '@angular/core';
import { PollutionState, PollutionStateModel } from '@appstore/pollution/pollution.state';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ClearSearchAndStorage, InitFetchCities } from './../../../store/pollution/pollution.actions';

@Component({
  selector: 'app-pollution-container',
  templateUrl: './pollution-container.component.html',
  styleUrls: ['./pollution-container.component.scss']
})
export class PollutionContainerComponent {

  @Select(PollutionState.getState) public state$: Observable<PollutionStateModel>;

  showAccordians = false;

  constructor(public store: Store) { }

  triggerAnimation() {
    this.showAccordians = !this.showAccordians;
  }

  clear() {
    this.store.dispatch(new ClearSearchAndStorage());
  }

  search(data: { country: string, param: string }) {
    this.store.dispatch(new InitFetchCities(data));
  }

}
