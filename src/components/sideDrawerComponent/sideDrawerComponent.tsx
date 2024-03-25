import React, { useState } from "react";
import styles from "./sideDrawerComponent.module.scss";
import { Genres, languages } from "@/utils/constants";
import { Filters } from "@/utils/types";

const SideDrawerComponent = ({
  applyFilters,
  activeFilters,
}: {
  applyFilters: (filters: Filters) => void;
  activeFilters?: Filters;
}) => {
  const [filters, setFilters] = useState<Filters>({
    date: false,
    score: 0,
    language: "",
    "release_date.gte": "",
    "release_date.lte": "",
    genre: [],
    ...activeFilters,
  });
  console.log({ filters });

  const handleInputChange = (e: any) => {
    const target = e.target;
    const name = target.name;
    if (name === "date") {
      setFilters({
        ...filters,
        [name]: target.checked,
        "release_date.gte": "",
        "release_date.lte": "",
      });
      return;
    }
    setFilters({ ...filters, [name]: target.value });
  };

  const updateSelectedGenre = (genre: { id: number; name: string }) => {
    if (filters.genre.includes(genre?.id)) {
      const filteredGenres = filters.genre.filter(
        (genreElement) => genreElement !== genre?.id
      );
      setFilters({ ...filters, genre: filteredGenres });
    } else {
      const updatedGenre: number[] = [...filters.genre, genre?.id];
      setFilters({ ...filters, genre: updatedGenre });
    }
  };

  return (
    <div className={styles.sideDrawer}>
      <h2>{"Sort & Filter"}</h2>
      <div className={styles.contentDiv}>
        <h3>Release Dates</h3>
        <div className={styles.checkBoxDiv}>
          <input
            name="date"
            type="checkbox"
            checked={filters.date}
            onChange={handleInputChange}
          />
          Search All Releases
        </div>
        <div className={styles.selectDate}>
          <label htmlFor="fromDate">from</label>
          <input
            name="release_date.gte"
            type="date"
            id="fromDate"
            value={filters["release_date.gte"]}
            disabled={filters.date}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.selectDate}>
          <label htmlFor="toDate">to</label>
          <input
            name="release_date.lte"
            type="date"
            id="toDate"
            value={filters["release_date.lte"]}
            onChange={handleInputChange}
            disabled={filters.date}
          />
        </div>
      </div>
      <div className={styles.contentDiv}>
        <h3>Genres</h3>
        {Genres.map((genre) => (
          <button
            className={`${styles.genre} ${
              filters.genre.includes(genre?.id) ? styles.active : ""
            }`}
            key={genre?.id}
            onClick={() => updateSelectedGenre(genre)}
          >
            {genre?.name}
          </button>
        ))}
      </div>
      <div className={styles.contentDiv}>
        <h3>
          Language <span></span>
        </h3>
        <select
          name="language"
          value={filters.language}
          onChange={handleInputChange}
        >
          <option value="" hidden>
            None Selected
          </option>
          {languages.map((language) => (
            <option value={language?.code} key={language?.code}>
              {language?.value}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.contentDiv}>
        <h3>User Score</h3>
        <input
          name="score"
          type="range"
          min={0}
          max={10}
          value={filters.score}
          onChange={handleInputChange}
        />
      </div>
      <button
        type="submit"
        className={styles.submitButton}
        onClick={() => applyFilters(filters)}
      >
        Search
      </button>
    </div>
  );
};

export default SideDrawerComponent;
