import styles from "./Mainbar.module.scss";
import logo from "@/assets/logo.svg";
import { useNavigate } from "react-router-dom";

const Mainbar = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.mainBar}>
      <nav className={styles.mainBar__nav}>
        <div className={styles.mainBar__navTop}>
          <ul className={styles.mainBar__navList}>
            <li className={styles.mainBar__navTopItem}>
              <a href="#" className={styles.logo}>
                <img src={logo} alt="logo" />
              </a>
            </li>
            <li className={styles.mainBar__navTopItem}>
              <a href="#" className={styles.mainBar__navLink}>
                <span className={"_icon-company"}></span>
              </a>
            </li>
            <li className={styles.mainBar__navTopItem}>
              <a href="#" className={styles.mainBar__navLink}>
                <span className={"_icon-search"}></span>
              </a>
            </li>
          </ul>
        </div>
        <div className={styles.mainBar__line}></div>
        <div className={styles.mainBar__navBottom}>
          <ul className={styles.mainBar__navList}>
            <li className={styles.mainBar__navBottomItem}>
              <a href="#" className={styles.mainBar__navLink}>
                <span className={"_icon-settings"}></span>
              </a>
            </li>
            <li className={styles.mainBar__navBottomItem}>
              <a href="#" className={styles.mainBar__navLink} onClick={() => {
                localStorage.removeItem('token');
                navigate('/login');
              }}>
                <span className={"_icon-signOut"}></span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Mainbar;
