import { FC, ReactNode } from 'react';
import styles from './index.module.scss';

type CardProps = {
  children: ReactNode;
};

const CardContainer: FC<CardProps> = ({ children }) => {
  return (
    <div className={styles.card}>
      {children}
    </div>
  );
};

export default CardContainer; 