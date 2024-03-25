import React, { useState } from "react";
import styles from "./header.module.scss";
import SideDrawerComponent from "../sideDrawerComponent/sideDrawerComponent";
import { Screen } from "@/utils/constants";
import { Filters } from "@/utils/types";

const Header = ({
  showScreen,
  applyFilters,
  activeFilters,
}: {
  showScreen: (val: Screen) => void;
  applyFilters: (filters?: Filters) => void;
  activeFilters?: Filters;
}) => {
  const [openFilterOption, setOpenFilterOption] = useState(false);

  const applyFiltersAndClear = (filters?: Filters) => {
    applyFilters(filters);
    setOpenFilterOption(false);
    showScreen(Screen.MAIN);
  };

  return (
    <>
      <header className={styles.header}>
        <span onClick={() => applyFiltersAndClear()}>Movie App</span>
        <button onClick={() => setOpenFilterOption(true)}>Sort & filter</button>
      </header>
      {openFilterOption && (
        <SideDrawerComponent
          applyFilters={applyFiltersAndClear}
          activeFilters={activeFilters}
        />
      )}
    </>
  );
};

export default Header;
