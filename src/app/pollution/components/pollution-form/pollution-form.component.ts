import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Country, Parameter, SearchParams } from 'src/app/pollution/pollution';


@Component({
  selector: 'app-pollution-form',
  templateUrl: './pollution-form.component.html',
  styleUrls: ['./pollution-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PollutionFormComponent implements OnInit {

  @Input() allowedCountries: Country[];
  @Input() allowedParameters: Parameter[];
  @Input() defaultValue?: SearchParams;
  @Output() searchCountry: EventEmitter<SearchParams> = new EventEmitter<SearchParams>();
  @Output() clearSearch: EventEmitter<void> = new EventEmitter<void>();
  searchForm: FormGroup;
  error: string;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  clearInput() {
    this.error = '';
    this.searchForm.reset({
      parameter: 'pm25'
    });
    this.clearSearch.emit();
  }

  buildForm() {

    console.dir(this.defaultValue.param);

    this.searchForm = this.fb.group({
      country: [this.defaultValue.country, Validators.required],
      parameter: [this.defaultValue.param, Validators.required]
    });
  }

  search(form: any) {
    const country: string = form.country;
    const param = form.parameter;
    const validate = this.allowedCountries.map((value) => value.name.toLowerCase()).includes(country.toLowerCase());
    if (validate) {
      this.searchCountry.emit({ country, param });
    } else {
      this.error = `Invalid country, please choose one from: poland, spain, france or germany`;
    }
  }

}
