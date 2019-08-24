import { Component } from '@angular/core';
import { PollutionState, PollutionStateModel } from '@appstore/pollution/pollution.state';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { InitFetchCities } from './../../../store/pollution/pollution.actions';

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

  search(country: string) {
    this.store.dispatch(new InitFetchCities(country));
  }

}
