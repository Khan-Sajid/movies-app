import {
  getFavorite,
  getPopularMovieList,
  getWatchList,
} from "@/utils/service";
import styles from "./page.module.css";
import HomePageComponent from "@/components/homePageComponent/homePageComponent";

export default async function Home() {
  const popularMovieData = await getPopularMovieList({});
  const watchListDataRes = await getWatchList({});
  const favoriteDataRes = await getFavorite({});

  return (
    <main className={styles.main}>
      <HomePageComponent
        popularMovieData={popularMovieData}
        favData={favoriteDataRes?.results}
        watchListData={watchListDataRes?.results}
      />
    </main>
  );
}
