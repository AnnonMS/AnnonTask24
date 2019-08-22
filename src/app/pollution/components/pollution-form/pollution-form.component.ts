import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Country } from 'src/app/pollution/pollution';


@Component({
  selector: 'app-pollution-form',
  templateUrl: './pollution-form.component.html',
  styleUrls: ['./pollution-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PollutionFormComponent implements OnInit {

  @Input() allowedCountries: Country[];
  @Input() defaultValue?: string;
  @Output() searchCountry: EventEmitter<string> = new EventEmitter<string>();
  searchForm: FormGroup;
  error: string;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.searchForm = this.fb.group({
      country: [this.defaultValue, [
        Validators.required,
      ]],
    });
  }

  search(form: any) {
    const country: string = form.country;
    const validate = this.allowedCountries.map((value) => value.name.toLowerCase()).includes(country.toLowerCase());
    if (validate) {
      this.searchCountry.emit(country);
    } else {
      this.error = `The country ${country} is not supported at this moment`;
    }
  }

}
