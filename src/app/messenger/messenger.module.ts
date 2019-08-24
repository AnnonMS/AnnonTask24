import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MessengerContainerComponent } from './messenger-container/messenger-container.component';

@NgModule({
  declarations: [MessengerContainerComponent],
  imports: [
    CommonModule
  ],
  exports: [MessengerContainerComponent]
})
export class MessengerModule { }
