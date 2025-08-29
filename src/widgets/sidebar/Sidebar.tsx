import Button from "@/shared/api/ui/Button/Button";
import styles from "./Sidebar.module.scss";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar__header}>
        <div className={styles.sidebar__header__title}>Oak Tree Cementry</div>
        <div className={styles.sidebar__header__subtitle}>Process Manager</div>
      </div>
      <div className={styles.sidebar__content}>
        <Button variant="filled" text="Organizations" icon="company" />
        <Button variant="outlined" text="Contractors" icon="contractor" />
        <Button variant="outlined" text="Clients" icon="social" />
      </div>
      <div className={styles.sidebar__footer}>
        <div className={styles.sidebar__footer__text}>
          All Funeral Services © 2015-2025
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
