export interface City {
  name: string;
  description: string;
}

export interface Country {
  name: string;
  iso: string;
}

export interface Measurements {
  results: Result[];
}

export interface Result {
  location: string;
  parameter: string;
  value: number;
  unit: string;
  coordinates: Coordinates;
  country: string;
  city: string;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

// Wikipedia Response

export interface CityDescWikiResponse {
  batchcomplete: string;
  query: Query;
}

export interface Query {
  redirects: Redirect[];
  pages: Pages[];
}

export interface Pages {
  [key: string]: Page;
}

export interface Page {
  pageid: number;
  ns: number;
  title: string;
  extract: string;
  description: string;
}

interface Redirect {
  from: string;
  to: string;
}
