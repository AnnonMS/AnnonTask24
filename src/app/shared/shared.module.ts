import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InputInArrayDirective } from './validators/input-in-array/input-in-array.directive';

@NgModule({
  declarations: [InputInArrayDirective],
  imports: [
    CommonModule
  ],
  exports: [InputInArrayDirective]
})
export class SharedModule { }
