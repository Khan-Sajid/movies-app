"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./movieCard.module.scss";
import { URL } from "@/utils/constants";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useDebounce } from "@/hooks/useDebounce";
import { addToFavorite, addToWatchList, getMovieVideo } from "@/utils/service";
import { FaHeart } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { AppContext } from "@/app/context/context";

const MovieCard = ({ movieCardData, bottomBarNeeded = false }: any) => {
  const imageContainer = useRef(null);
  const observer = useIntersectionObserver(imageContainer, {
    rootMargin: "-28% 0% -70% 0%",
  });
  const value = useDebounce(observer?.isIntersecting, 500);
  const [videoData, setVideoData] = useState<any>();
  const videoID = videoData?.[videoData?.length - 1]?.key;
  const { userSpecificData, setUserSpecificData } = useContext(AppContext);
  const isFav = userSpecificData?.fav?.includes(+movieCardData.id);
  const isWL = userSpecificData?.wl?.includes(+movieCardData.id);

  async function addToFav() {
    let favList = userSpecificData?.fav;
    isFav
      ? (favList = favList?.filter((id: string) => +id !== +movieCardData.id))
      : favList.push(+movieCardData.id);
    setUserSpecificData({ ...userSpecificData, fav: favList });
    await addToFavorite({
      media_id: movieCardData.id,
      favorite: !isFav,
    });
  }
  async function addToWL() {
    let WList = userSpecificData?.wl;
    isWL
      ? (WList = WList?.filter((id: string) => +id !== +movieCardData.id))
      : WList.push(+movieCardData.id);
    setUserSpecificData({ ...userSpecificData, wl: WList });
    await addToWatchList({
      media_id: movieCardData.id,
      watchlist: !isWL,
    });
  }

  useEffect(() => {
    if (value && !videoData) {
      (async () => {
        const videoDataRes = await getMovieVideo(movieCardData?.id);
        if (videoDataRes && videoDataRes?.results) {
          setVideoData(videoDataRes?.results);
        }
      })();
    }
  }, [value]);

  if (!movieCardData) return <></>;
  return (
    <div className={styles.outerDiv} id={movieCardData?.id}>
      <div ref={imageContainer} className={styles.imageContainer}>
        {!videoData || !observer?.isIntersecting ? (
          <>
            <img src={URL.IMAGE_URL + movieCardData.backdrop_path} />
            <div className={styles.nameDiv}>{movieCardData.title}</div>
          </>
        ) : (
          <iframe
            id="ytplayer"
            src={`https://www.youtube.com/embed/${videoID}?autoplay=1&mute=1`}
            allow="autoplay"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        )}
      </div>
      {bottomBarNeeded && (
        <div className={styles.favBox}>
          <span onClick={addToFav}>
            <FaHeart
              style={{
                fontSize: "16px",
                color: `${isFav ? "#edcf2e" : "#0f0f0f"}`,
              }}
            />
            Favorite
          </span>
          <span onClick={addToWL}>
            <FaBookmark
              style={{
                fontSize: "16px",
                color: `${isWL ? "#edcf2e" : "#0f0f0f"}`,
              }}
            />
            Wishlist
          </span>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
