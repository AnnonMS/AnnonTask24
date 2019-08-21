import { State, Action, Selector, StateContext } from '@ngxs/store';
import { PollutionAction } from './pollution.actions';

export interface PollutionStateModel {
  items: string[];
}

@State<PollutionStateModel>({
  name: 'pollution',
  defaults: {
    items: []
  }
})
export class PollutionState {

  @Selector()
  public static getState(state: PollutionStateModel) {
    return state;
  }

  @Action(PollutionAction)
  public add(ctx: StateContext<PollutionStateModel>, { payload }: PollutionAction) {
    const stateModel = ctx.getState();
    stateModel.items = [...stateModel.items, payload];
    ctx.setState(stateModel);
  }
}
