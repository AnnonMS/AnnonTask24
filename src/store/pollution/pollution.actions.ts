export class PollutionAction {
  public static readonly type = '[Pollution] Add item';
  constructor(public payload: string) { }
}