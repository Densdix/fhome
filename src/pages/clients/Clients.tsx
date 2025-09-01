import styles from "./Clients.module.scss";

const Clients = () => {
  return (
    <div className={styles.clients}>
      <div className={styles.clients__header}>
        <h1 className={styles.clients__title}>Clients</h1>
      </div>
      <div className={styles.clients__content}>
        <div className={styles.clients__placeholder}>
          <h3>Clients Management</h3>
          <p>
            This page is under development. Clients management functionality
            will be available soon.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Clients;
