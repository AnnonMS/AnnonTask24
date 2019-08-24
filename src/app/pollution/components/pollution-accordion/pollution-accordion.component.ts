import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { City } from 'src/app/pollution/pollution';

@Component({
  selector: 'app-pollution-accordion',
  templateUrl: './pollution-accordion.component.html',
  styleUrls: ['./pollution-accordion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PollutionAccordionComponent {

  @Input() cities: City[];

  activeIndex: number;

  toggle(index: number) {
    this.activeIndex = index;
  }
}
