import { FC, ReactNode } from 'react';
import styles from './index.module.scss';

type CardRowProps = {
  children: ReactNode;
};

const CardRow: FC<CardRowProps> = ({ children }) => {
  return (
    <div className={styles.card__row}>
      {children}
    </div>
  );
};

export default CardRow; 