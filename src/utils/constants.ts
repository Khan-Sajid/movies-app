export const ShortingType = {
  CREATED_AT_ASC: "created_at.asc",
  CREATED_AT_DESC: "created_at.desc",
  VOTE_AVERAGE_ASC: "vote_average.asc",
  VOTE_AVERAGE_DESC: "vote_average.desc",
  FIRST_AIR_DATE_ASC: "first_air_date.asc",
  FIRST_AIR_DATE_DESC: "first_air_date.desc",
  POPULARITY_ASC: "popularity.asc",
  POPULARITY_DESC: "popularity.desc",
  VOTE_COUNT_ASC: "vote_count.asc",
  VOTE_COUNT_DESC: "vote_count.desc",
  ORIGINAL_TITLE_ASC: "original_title.asc",
  ORIGINAL_TITLE_DESC: "original_title.desc",
  RELEASE_DATE_ASC: "release_date.asc",
  RELEASE_DATE_DESC: "release_date.desc",
  REVENUE_ASC: "revenue.asc",
  REVENUE_DESC: "revenue.desc",
  PRIMARY_RELEASE_DATE_ASC: "primary_release_date.asc",
  PRIMARY_RELEASE_DATE_DESC: "primary_release_date.desc",
};

export const ActionTypes = {
  RATING: "rating",
  ADD_ITEM: "add_item",
  REMOVE_ITEM: "remove_item",
  CLEAR: "clear",
};

export const MediaType = {
  ALL: "all",
  MOVIE: "movie",
  TV: "tv",
  PERSON: "person",
};

export const externalSources = {
  IMDB_ID: "imdb_id",
  FREEBASE_MID: "freebase_mid",
  FREEBASE_ID: "freebase_id",
  TVDB_ID: "tvdb_id",
  TVRAGE_ID: "tvrage_id",
  FACEBOOK_ID: "facebook_id",
  TWITTER_ID: "twitter_id",
  INSTAGRAM_ID: "instagram_id",
};

export const URL = {
  IMAGE_URL: "https://image.tmdb.org/t/p/original",
};

export enum Screen {
  WISHLIST = "wishlist",
  FAVORITE = "favorite",
  MAIN = "main",
}

export const Genres = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];
export const languages = [
  { code: "en", value: "English" },
  { code: "hi", value: "Hindi" },
  { code: "ta", value: "Tamil" },
  { code: "te", value: "Telugu" },
  { code: "ml", value: "Malayalam" },
];
