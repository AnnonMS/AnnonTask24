import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Country, Parameter, SearchParams } from 'src/app/pollution/pollution';
import { inArrayValidator } from 'src/app/shared/validators/input-in-array/input-in-array.directive';


@Component({
  selector: 'app-pollution-form',
  templateUrl: './pollution-form.component.html',
  styleUrls: ['./pollution-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PollutionFormComponent implements OnInit {

  @Input() allowedCountries: Country[];
  @Input() allowedParameters: Parameter[];
  @Input() defaultValue: SearchParams;
  @Output() searchCountry: EventEmitter<SearchParams> = new EventEmitter<SearchParams>();
  @Output() clearSearch: EventEmitter<void> = new EventEmitter<void>();
  searchForm: FormGroup;
  error: string;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  clearInput() {
    this.searchForm.reset({
      parameter: 'pm25'
    });
    this.clearSearch.emit();
  }

  buildForm() {

    const allowedCountiesNames = this.allowedCountries.map((value) => value.name);

    this.searchForm = this.fb.group({
      country: [this.defaultValue.country, [
        Validators.required,
        inArrayValidator(allowedCountiesNames),
      ]],
      parameter: [this.defaultValue.param, Validators.required]
    });
  }

  search(form: any) {

    const search: SearchParams = {
      country: form.country,
      param: form.parameter
    };

    if (form.valid) {
      this.searchCountry.emit(search);
    }
  }

}
