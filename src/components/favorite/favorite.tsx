import React, { useEffect, useState } from "react";
import MovieCard from "../movieCard/movieCard";
import styles from "./favorite.module.scss";
import { getFavorite } from "@/utils/service";

const Favorite = () => {
  const [FavData, setFavData] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    (async () => {
      const dataRes = await getFavorite({});
      if (dataRes?.results) setFavData(dataRes.results);
    })();
    return () => {
      setFavData([]);
    };
  }, []);

  return (
    <div className={styles.cardsContainer}>
      <h2>Favorites</h2>
      {FavData?.map((movieCardData: any, index: number) => {
        return (
          <MovieCard
            key={movieCardData?.id + index}
            movieCardData={movieCardData}
          />
        );
      })}
    </div>
  );
};

export default Favorite;
