export interface Message {
  desc: string;
  type: MessageType;
}

export enum MessageType {
  info = 'info',
  success = 'success',
  warning = 'warning',
  error = 'error'
}
