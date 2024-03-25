import { SearchMoviePayload } from "./types";

const sessionKey = process.env.NEXT_PUBLIC_SESSION_KEY;
const accountId = process.env.NEXT_PUBLIC_ACCOUNT_ID;
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

enum METHOD {
  GET = "GET",
  POST = "POST",
}

export async function getPopularMovieList({ lang = "en-US", page = 1 }) {
  const options = {
    method: METHOD.GET,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${sessionKey}`,
    },
  };

  const query = new URLSearchParams();
  query.set("language", lang);
  query.set("page", page + "");

  return fetch(`${baseUrl}/movie/popular?${query}`, options)
    .then((response) => response.json())
    .catch((err) => {
      console.error(err);
      return err;
    });
}

export async function getMovieVideo(movieID: number) {
  const options = {
    method: METHOD.GET,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${sessionKey}`,
    },
  };

  return fetch(`${baseUrl}/movie/${movieID}/videos?language=en-US`, options)
    .then((response) => response.json())
    .catch((err) => {
      console.error(err);
      return err;
    });
}

export async function searchMovie({
  query,
  lang = "en-US",
  include_adult = "false",
  page = 1,
  primary_release_year,
  region,
  year,
}: SearchMoviePayload) {
  const options = {
    method: METHOD.GET,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${sessionKey}`,
    },
  };

  const queryParams = new URLSearchParams();
  queryParams.set("query", query);
  queryParams.set("language", lang);
  queryParams.set("include_adult", include_adult);
  queryParams.set("page", page.toString());
  if (region) queryParams.set("region", region);
  if (year) queryParams.set("year", year);
  if (primary_release_year)
    queryParams.set("primary_release_year", primary_release_year);

  return fetch(`${baseUrl}/search/movie?${queryParams}`, options)
    .then((response) => response.json())
    .catch((err) => {
      console.error(err);
      return err;
    });
}

export async function discoverMovies({
  include_adult = "false",
  include_video = "true",
  language = "en",
  page = 1,
  sort_by = "popularity.desc",
  vote = 0,
  score = 0,
  genre,
  ...others
}: any) {
  const options = {
    method: METHOD.GET,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${sessionKey}`,
    },
  };
  console.log(
    "sssadfasdf",
    language,
    include_adult,
    others["release_date.lte"]
  );

  const query = new URLSearchParams();

  if (language) query.set("with_original_language", language);
  query.set("include_adult", include_adult);
  query.set("include_video", include_video);
  query.set("sort_by", sort_by);
  query.set("page", page + "");
  query.set("vote_average.gte", vote + "");
  query.set("score", score);
  if (genre) query.set("with_genres", genre.join("|"));
  if (others["release_date.lte"])
    query.set("release_date.lte", others["release_date.lte"]);
  if (others["release_date.lte"])
    query.set("release_date.gte", others["release_date.gte"]);

  return fetch(`${baseUrl}/discover/movie?${query}`, options)
    .then((response) => response.json())
    .catch((err) => {
      console.error(err);
      return err;
    });
}

export async function addToWatchList({
  media_id = 11,
  media_type = "movie",
  watchlist = true,
}: any) {
  const options = {
    method: METHOD.POST,
    headers: {
      "content-type": "application/json",
      accept: "application/json",
      Authorization: `Bearer ${sessionKey}`,
    },
    body: JSON.stringify({
      media_type,
      media_id,
      watchlist,
    }),
  };

  return fetch(`${baseUrl}/account/${accountId}/watchlist`, options)
    .then((response) => response.json())
    .catch((err) => {
      console.error(err);
      return err;
    });
}

export async function addToFavorite({
  media_id = 11,
  media_type = "movie",
  favorite = true,
}: any) {
  const options = {
    method: METHOD.POST,
    headers: {
      "content-type": "application/json",
      accept: "application/json",
      Authorization: `Bearer ${sessionKey}`,
    },
    body: JSON.stringify({
      media_type: media_type,
      media_id: media_id,
      favorite: favorite,
    }),
  };

  return fetch(`${baseUrl}/account/${accountId}/favorite`, options)
    .then((response) => response.json())
    .catch((err) => {
      console.error(err);
      return err;
    });
}

export async function getWatchList({
  page = 1,
  language = "en-US",
  sort_by = "created_at.asc",
}: any) {
  const query = new URLSearchParams();
  query.set("language", language);
  query.set("sort_by", sort_by);
  query.set("page", page + "");

  let requestOptions = {
    method: "GET",
    headers: {
      Authorization: "Bearer " + sessionKey,
      accept: "application/json",
    },
  };

  return fetch(
    `${baseUrl}/account/${accountId}/watchlist/movies?${query}`,
    requestOptions
  )
    .then((response) => response.json())
    .catch((error) => {
      console.log("error", error);
      return error;
    });
}
export async function getFavorite({
  page = 1,
  language = "en-US",
  sort_by = "created_at.asc",
}: any) {
  const query = new URLSearchParams();
  query.set("language", language);
  query.set("sort_by", sort_by);
  query.set("page", page + "");

  let requestOptions = {
    method: "GET",
    headers: {
      Authorization: "Bearer " + sessionKey,
      accept: "application/json",
    },
  };

  return fetch(
    `${baseUrl}/account/${accountId}/favorite/movies?${query}`,
    requestOptions
  )
    .then((response) => response.json())
    .catch((error) => {
      console.log("error", error);
      return error;
    });
}
