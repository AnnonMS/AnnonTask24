import { Injectable } from '@angular/core';
import { Message } from './message';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {

  messages: Message[] = [];

  addMessage(message: Message) {
    this.messages = [...this.messages, message];
  }

  deleteMessage(index: number) {
    this.messages = [...this.messages.slice(0, index), ...this.messages.slice(index + 1)];
  }

  clearAll() {
    this.messages = [];
  }

}
