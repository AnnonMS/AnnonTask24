
export class InitFetchCities {
  public static readonly type = '[Pollution] Initial Fetch Cities from api.openaq.org/v1/latest';
  constructor(public payload: string) { }
}

export class FetchCities {
  public static readonly type = '[Pollution] Fetch Citiest';
  constructor(public payload: string) { }
}

export class FetchCitiesDescription {
  public static readonly type = '[Pollution] Fetch Cities description from en.wikipedia.org/w/api.php';
  constructor(public payload: string[]) { }
}

export class CheckStorage {
  public static readonly type = '[Pollution] Check last search value inside Local storage';
}

export class ClearSearchAndStorage {
  public static readonly type = '[Pollution] Clear input value and Local storage';
}

export class SaveToStorage {
  public static readonly type = '[Pollution] Save last search to Local storage';
  constructor(public payload: string) { }
}

export class ShowLoader {
  public static readonly type = '[Pollution] show loader';
}

export class HideLoader {
  public static readonly type = '[Pollution] Hide loader';
}
