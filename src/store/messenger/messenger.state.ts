import { Action, Selector, State, StateContext } from '@ngxs/store';
import { produce } from 'immer';
import { Message } from 'src/app/messenger/message';
import { AddMessage, ClearMessages, DeleteMessage } from './messenger.actions';

export interface MessengerStateModel {
  messages: Message[];
}

@State<MessengerStateModel>({
  name: 'messenger',
  defaults: {
    messages: []
  }
})
export class MessengerState {

  @Selector()
  public static getState(state: MessengerStateModel) {
    return state;
  }

  @Selector()
  public static getMessages(state: MessengerStateModel) {
    return state.messages;
  }

  @Action(AddMessage)
  public add(ctx: StateContext<MessengerStateModel>, { payload }: AddMessage) {
    ctx.setState(produce(ctx.getState(), draft => { draft.messages = [...draft.messages, payload]; }));
  }

  @Action(DeleteMessage)
  public delete(ctx: StateContext<MessengerStateModel>, { payload }: DeleteMessage) {
    ctx.setState(produce(ctx.getState(), draft => {
      draft.messages = draft.messages.filter((_, index) => index !== payload);
    }));
  }
  @Action(ClearMessages)
  public clearMessages(ctx: StateContext<MessengerStateModel>) {
    ctx.setState(produce(ctx.getState(), draft => { draft.messages = []; }));
  }
}
