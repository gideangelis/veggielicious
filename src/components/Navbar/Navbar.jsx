import { Link } from "react-router-dom";

import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <nav className={styles.nav}>
      <Link to='/' className="link-styling">
        <h1 className={styles.logo}>
          <span>🥑</span>Veggielicious
        </h1>
      </Link>
    </nav>
  );
}

export default Navbar;
