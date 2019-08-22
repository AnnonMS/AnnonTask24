export interface City {
  name: string;
  description: string;
}

export interface Country {
  name: string;
  iso: string;
}

export interface Measurements {
  meta: Meta;
  results: Result[];
}

export interface Result {
  location: string;
  parameter: string;
  date: Date;
  value: number;
  unit: string;
  coordinates: Coordinates;
  country: string;
  city: string;
}

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface Date {
  local: string;
  utc: string;
}

interface Meta {
  name: string;
  license: string;
  website: string;
  page: number;
  limit: number;
  found: number;
}


// https://api.openaq.org/v1/measurements?country=PL&parameter=pm25&limit=20&order_by=value&sort=desc
