import { async, TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { Message, MessageType } from 'src/app/messenger/message';
import { AddMessage, ClearMessages, DeleteMessage } from './messenger.actions';
import { MessengerState, MessengerStateModel } from './messenger.state';

describe('Messenger store', () => {
  let store: Store;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([MessengerState])]
    }).compileComponents();
    store = TestBed.get(Store);
  }));

  it('should add message', () => {

    const mockItem: Message = { desc: 'test message', type: MessageType.info };

    const expected: MessengerStateModel = {
      messages: [
        { desc: 'test message', type: MessageType.info },
      ]
    };

    store.dispatch(new AddMessage(mockItem));
    const actual = store.selectSnapshot(MessengerState.getState);
    expect(actual).toEqual(expected);
  });

  it('should delete message', () => {

    const message: Message = { desc: 'test message 0', type: MessageType.info };
    const messageTodelete: Message = { desc: 'delete this', type: MessageType.info };

    store.dispatch(new AddMessage(message));
    store.dispatch(new AddMessage(messageTodelete));
    store.dispatch(new AddMessage(message));

    store.dispatch(new DeleteMessage(1));

    const expected: MessengerStateModel = {
      messages: [
        message,
        message,
      ]
    };

    const actual = store.selectSnapshot(MessengerState.getState);
    expect(actual).toEqual(expected);
  });

  it('should clear all messages', () => {

    const message: Message = { desc: 'test message 0', type: MessageType.info };

    store.dispatch(new AddMessage(message));
    store.dispatch(new AddMessage(message));

    store.dispatch(new ClearMessages());

    const expected: MessengerStateModel = {
      messages: []
    };

    const actual = store.selectSnapshot(MessengerState.getState);
    expect(actual).toEqual(expected);
  });

});
