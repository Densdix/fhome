import styles from "./Contractors.module.scss";

const Contractors = () => {
  return (
    <div className={styles.contractors}>
      <div className={styles.contractors__header}>
        <h1 className={styles.contractors__title}>Contractors</h1>
      </div>
      <div className={styles.contractors__content}>
        <div className={styles.contractors__placeholder}>
          <h3>Contractors Management</h3>
          <p>
            This page is under development. Contractors management functionality
            will be available soon.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contractors;
