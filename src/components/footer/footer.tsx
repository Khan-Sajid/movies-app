import React from "react";
import styles from "./footer.module.scss";
import { Screen } from "@/utils/constants";

const Footer = ({ showScreen }: { showScreen: (val: Screen) => void }) => {
  return (
    <footer className={styles.footer}>
      <button onClick={() => showScreen(Screen.FAVORITE)}>Favorites</button>
      <button onClick={() => showScreen(Screen.WISHLIST)}>Wishlist</button>
    </footer>
  );
};

export default Footer;
