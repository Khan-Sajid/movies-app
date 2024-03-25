export interface SearchMoviePayload {
  query: string;
  lang?: string;
  include_adult?: "true" | "false";
  page?: number;
  primary_release_year?: string;
  region?: string;
  year?: string;
}

export interface Filters {
  genre: number[];
  date: boolean;
  score: number;
  language: string;
  "release_date.gte": string;
  "release_date.lte": string;
}
