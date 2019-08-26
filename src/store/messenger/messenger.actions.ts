import { Message } from 'src/app/messenger/message';

export class AddMessage {
  public static readonly type = '[Messenger] Add message';
  constructor(public payload: Message) { }
}

export class DeleteMessage {
  public static readonly type = '[Messenger] Delete message';
  constructor(public payload: number) { }
}

export class ClearMessages {
  public static readonly type = '[Messenger] Clear Messages';
}
