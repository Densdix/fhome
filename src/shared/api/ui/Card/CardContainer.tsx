import { FC, ReactNode } from 'react';
import styles from './index.module.scss';

type CardProps = {
  children: ReactNode;
};

const Card: FC<CardProps> = ({ children }) => {
  return (
    <div className={styles.card}>
      {children}
    </div>
  );
};

export default Card; 