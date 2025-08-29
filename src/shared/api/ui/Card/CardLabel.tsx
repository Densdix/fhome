import styles from './index.module.scss';

const CardLabel = ({ label }: { label: string }) => {
  return <div className={styles.card__label}>{label}</div>;
};

export default CardLabel;
