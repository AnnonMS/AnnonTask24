import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PollutionContainerComponent } from './pollution-container/pollution-container.component';

@NgModule({
  declarations: [PollutionContainerComponent],
  imports: [
    CommonModule
  ],
  exports: [PollutionContainerComponent]
})
export class PollutionModule { }
