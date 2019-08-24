import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessengerModule } from './../messenger/messenger.module';
import { PollutionAccordionComponent } from './components/pollution-accordion/pollution-accordion.component';
import { PollutionFormComponent } from './components/pollution-form/pollution-form.component';
import { PollutionContainerComponent } from './pollution-container/pollution-container.component';

@NgModule({
  declarations: [PollutionContainerComponent, PollutionFormComponent, PollutionAccordionComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MessengerModule,
  ],
  exports: [PollutionContainerComponent]
})
export class PollutionModule { }

