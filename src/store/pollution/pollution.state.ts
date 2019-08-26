import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import { produce } from 'immer';
import { City, Country, Parameter, SearchParams } from 'src/app/pollution/pollution';
import { PollutionService } from 'src/app/pollution/pollution.service';
import { CheckStorage, ClearSearchAndStorage, FetchCities, FetchCitiesDescription, HideLoader, InitFetchCities, SaveToStorage, ShowLoader } from './pollution.actions';
export interface PollutionStateModel {
  lastSearch: SearchParams;
  countries: Country[];
  cities: City[];
  citynames: string[];
  parameters: Parameter[];
  fetchingData: boolean;
}

@State<PollutionStateModel>({
  name: 'pollution',
  defaults: {
    lastSearch: {
      country: '',
      param: 'pm25'
    },
    countries: [
      { name: 'Poland', iso: 'PL' },
      { name: 'Germany', iso: 'DE' },
      { name: 'Spain', iso: 'ES' },
      { name: 'France', iso: 'FR' }
    ],
    parameters: [
      { name: 'pm2.5', value: 'pm25' },
      { name: 'pm10', value: 'pm10' },
      { name: 'Ozone', value: 'o3' }
    ],
    citynames: [],
    cities: [],
    fetchingData: false
  }
})
export class PollutionState implements NgxsOnInit {

  constructor(private pollutionSrv: PollutionService) { }


  @Selector()
  public static getState(state: PollutionStateModel) {
    return state;
  }

  /*
   * Dispatch CheckStorage on start
  */

  ngxsOnInit(ctx: StateContext<PollutionStateModel>) {
    ctx.dispatch(new CheckStorage());
  }

  // Actions

  @Action(CheckStorage)
  checkStorage(ctx: StateContext<PollutionStateModel>) {
    ctx.setState(produce(ctx.getState(), (draft: PollutionStateModel) => {
      draft.lastSearch = {
        country: localStorage.getItem('lastSearchCountry'),
        param: localStorage.getItem('lastSearchParam') ? localStorage.getItem('lastSearchParam') : 'pm25',
      };
    }));
  }

  @Action(ShowLoader)
  showLoader(ctx: StateContext<PollutionStateModel>) {
    ctx.setState(produce(ctx.getState(), (draft: PollutionStateModel) => { draft.fetchingData = true; }));
  }

  @Action(HideLoader)
  hideLoader(ctx: StateContext<PollutionStateModel>) {
    ctx.setState(produce(ctx.getState(), (draft: PollutionStateModel) => { draft.fetchingData = false; }));
  }

  @Action(SaveToStorage)
  saveToStorage(ctx: StateContext<PollutionStateModel>, { payload }: SaveToStorage) {
    ctx.setState(
      produce(ctx.getState(), (draft: PollutionStateModel) => {
        draft.lastSearch = {
          country: payload.country,
          param: payload.param
        };
        localStorage.setItem('lastSearchCountry', payload.country);
        localStorage.setItem('lastSearchParam', payload.param);
      }),
    );
  }

  @Action(ClearSearchAndStorage)
  clearSearchAndStorage(ctx: StateContext<PollutionStateModel>) {
    ctx.setState(
      produce(ctx.getState(), (draft: PollutionStateModel) => {
        draft.lastSearch = { country: '', param: 'pm25' };
        draft.cities = [];
        localStorage.removeItem('lastSearchCountry');
        localStorage.removeItem('lastSearchParam');
      }),
    );
  }

  @Action(InitFetchCities)
  public initFetchCities(ctx: StateContext<PollutionStateModel>, { payload }: InitFetchCities) {

    ctx.dispatch(new ShowLoader());
    ctx.dispatch(new SaveToStorage(payload));
    const countries = ctx.getState().countries;
    const iso = countries.filter((country) => country.name.toLowerCase() === payload.country.toLowerCase())[0].iso; // find iso code
    ctx.dispatch(new FetchCities({ country: iso, param: payload.param }));
  }

  @Action(FetchCities)
  public async fetchCities(ctx: StateContext<PollutionStateModel>, { payload }: FetchCities) {
    const cityNames = await this.pollutionSrv.getCities(payload);
    ctx.setState(produce(ctx.getState(), (draft: PollutionStateModel) => { draft.citynames = cityNames; }));
    ctx.dispatch(new FetchCitiesDescription(cityNames));
  }

  @Action(FetchCitiesDescription)
  public async fetchCitiesDescription(ctx: StateContext<PollutionStateModel>, { payload }: FetchCitiesDescription) {
    const cities = await this.pollutionSrv.getCityDescriptions(payload);
    ctx.setState(produce(ctx.getState(), (draft: PollutionStateModel) => { draft.cities = cities; }));
    ctx.dispatch(new HideLoader());
  }

}

