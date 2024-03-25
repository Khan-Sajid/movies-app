"use client";
import React, { useEffect, useRef, useState } from "react";
import Header from "../header/header";
import Footer from "../footer/footer";
import MovieCard from "../movieCard/movieCard";
import styles from "./homePageComponent.module.scss";
import { discoverMovies, getPopularMovieList } from "@/utils/service";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import Wishlist from "../wishlist/wishlist";
import Favorite from "../favorite/favorite";
import { Screen } from "@/utils/constants";
import { AppContext } from "@/app/context/context";
import { Filters } from "@/utils/types";

const HomePageComponent = ({
  popularMovieData,
  favData,
  watchListData,
}: any) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(popularMovieData?.results);
  const [page, setPage] = useState(1);
  const [screen, setScreen] = useState(Screen.MAIN);
  const bottomDivRef = useRef(null);
  const observer = useIntersectionObserver(bottomDivRef, {});
  const [appliedFilters, setAppliedFilters] = useState<Filters>();
  const isFirstRenderDone = useRef(false);
  const [userSpecificData, setUserSpecificData] = useState<{
    fav: string[];
    wl: string[];
  }>();

  const fetchData = async () => {
    setLoading(true);
    let popularMovieDataRes: any = [];
    if (appliedFilters) {
      popularMovieDataRes = await discoverMovies({
        ...appliedFilters,
        page: page + 1,
      });
    } else {
      popularMovieDataRes = await getPopularMovieList({ page: page + 1 });
    }
    if (page === 0) {
      setData(() => [...popularMovieDataRes?.results]);
    } else {
      setData((prevData: any) => [
        ...prevData,
        ...popularMovieDataRes?.results,
      ]);
    }
    setPage(page + 1);
    setLoading(false);
  };

  const showScreen = (value: Screen) => {
    switch (value) {
      case Screen.FAVORITE:
        setScreen(Screen.FAVORITE);
        break;
      case Screen.WISHLIST:
        setScreen(Screen.WISHLIST);
        break;
      case Screen.MAIN:
        setScreen(Screen.MAIN);
        break;
      default:
        setScreen(Screen.MAIN);
        break;
    }
  };

  const applyFilters = (filters?: Filters) => {
    setPage(0);
    if (JSON.stringify(filters) !== JSON.stringify(appliedFilters)) setData([]);
    setAppliedFilters(filters);
  };

  useEffect(() => {
    if (isFirstRenderDone.current && appliedFilters) {
      window.scrollTo(0, 0);
      fetchData();
    } else {
      isFirstRenderDone.current = true;
    }
    return () => {};
  }, [JSON.stringify(appliedFilters)]);

  useEffect(() => {
    const favIds = favData?.map?.((data: any) => {
      return data?.id;
    });
    const wlIds = watchListData?.map?.((data: any) => {
      return data?.id;
    });
    setUserSpecificData({ fav: favIds, wl: wlIds });
    return () => {
      setUserSpecificData(undefined);
    };
  }, [watchListData.length, favData.length]);

  useEffect(() => {
    // Event listener for scrolling
    if (observer?.isIntersecting) {
      fetchData();
    }
  }, [observer?.isIntersecting]);

  return (
    <AppContext.Provider value={{ userSpecificData, setUserSpecificData }}>
      <Header
        showScreen={showScreen}
        applyFilters={applyFilters}
        activeFilters={appliedFilters}
      />
      {screen === Screen.MAIN && (
        <div className={styles.cardsContainer}>
          {appliedFilters && <h2>Filtered Movies</h2>}
          {data?.map((movieCardData: any, index: number) => {
            return (
              <MovieCard
                key={movieCardData?.id + index}
                movieCardData={movieCardData}
                bottomBarNeeded={true}
              />
            );
          })}
          {data.length === 0 && !loading && <p>No Movies Found</p>}
          <div ref={bottomDivRef}>{loading && <div>Loading...</div>}</div>
        </div>
      )}
      {screen === Screen.WISHLIST && <Wishlist />}
      {screen === Screen.FAVORITE && <Favorite />}
      <Footer showScreen={showScreen} />
    </AppContext.Provider>
  );
};

export default HomePageComponent;
