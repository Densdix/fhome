import { FC, ReactNode } from 'react';
import styles from './index.module.scss';

type CardHeaderProps = {
  title: string;
  children?: ReactNode;
};

const CardHeader: FC<CardHeaderProps> = ({
  title,
  children,
}) => {
  return (
    <div className={styles.card__header}>
      <h3 className={styles.card__title}>{title}</h3>
      <div className={styles.card__actions}>{children}</div>
    </div>
  );
};

export default CardHeader; 