// import styles from "./style/app.module.css"
import styles from "../style/app.module.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className={styles.header}>
      <Link to="/">
        <button className={styles.headerButton}>HOME</button>
      </Link>
      <Link to="/signup">
        <button className={styles.headerButton}>SIGNUP</button>
      </Link>
    </header>
  );
};

export default Header;
