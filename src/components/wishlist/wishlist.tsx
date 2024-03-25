import React, { useEffect, useState } from "react";
import MovieCard from "../movieCard/movieCard";
import styles from "./wishlist.module.scss";
import { getWatchList } from "@/utils/service";

const Wishlist = () => {
  const [WLData, setWLData] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    (async () => {
      const dataRes = await getWatchList({});
      if (dataRes.results) setWLData(dataRes.results);
    })();
    return () => {
      setWLData([]);
    };
  }, []);

  return (
    <div className={styles.cardsContainer}>
      <h2>Wishlist</h2>
      {WLData?.map((movieCardData: any, index: number) => {
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

export default Wishlist;
