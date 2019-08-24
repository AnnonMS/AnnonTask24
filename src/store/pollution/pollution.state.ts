import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import { produce } from 'immer';
import { City, Country } from 'src/app/pollution/pollution';
import { PollutionService } from 'src/app/pollution/pollution.service';
import { CheckStorage, ClearSearchAndStorage, FetchCities, FetchCitiesDescription, HideLoader, InitFetchCities, SaveToStorage, ShowLoader } from './pollution.actions';
export interface PollutionStateModel {
  lastSearch: string;
  countries: Country[];
  cities: City[];
  fetchingData: boolean;
}

@State<PollutionStateModel>({
  name: 'pollution',
  defaults: {
    lastSearch: '',
    countries: [
      { name: 'Poland', iso: 'PL' },
      { name: 'Germany', iso: 'DE' },
      { name: 'Spain', iso: 'ES' },
      { name: 'France', iso: 'FR' }
    ],
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
    ctx.setState(produce(ctx.getState(), (draft: PollutionStateModel) => { draft.lastSearch = localStorage.getItem('lastSearch'); }));
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
        draft.lastSearch = payload;
        localStorage.setItem('lastSearch', payload);
      }),
    );
  }

  @Action(ClearSearchAndStorage)
  clearSearchAndStorage(ctx: StateContext<PollutionStateModel>) {
    ctx.setState(
      produce(ctx.getState(), (draft: PollutionStateModel) => {
        draft.lastSearch = '';
        draft.cities = [];
        localStorage.removeItem('lastSearch');
      }),
    );
  }

  @Action(InitFetchCities)
  public initFetchCities(ctx: StateContext<PollutionStateModel>, { payload }: InitFetchCities) {

    ctx.dispatch(new ShowLoader());
    ctx.dispatch(new SaveToStorage(payload));

    const countries = ctx.getState().countries;
    const iso = countries.filter((country) => country.name.toLowerCase() === payload.toLowerCase())[0].iso; // find iso code

    ctx.dispatch(new FetchCities(iso));
  }

  @Action(FetchCities)
  public async fetchCities(ctx: StateContext<PollutionStateModel>, { payload }: FetchCities) {
    const cityNames = await this.pollutionSrv.getCities(payload);
    ctx.dispatch(new FetchCitiesDescription(cityNames));
  }

  @Action(FetchCitiesDescription)
  public async fetchCitiesDescription(ctx: StateContext<PollutionStateModel>, { payload }: FetchCitiesDescription) {
    const cities = await this.pollutionSrv.getCityDescriptions(payload);
    ctx.setState(produce(ctx.getState(), (draft: PollutionStateModel) => { draft.cities = cities; }));
    ctx.dispatch(new HideLoader());
  }

}

