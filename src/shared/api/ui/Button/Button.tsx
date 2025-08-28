// Button.tsx
import React from 'react';
import styles from './Button.module.scss';

type Props = {
  variant?: 'filled' | 'outlined';
  iconUrl?: string;
  text: string;
  onClick?: () => void;
};

const Button: React.FC<Props> = ({ variant, text, onClick }) => {
  const buttonClass = [
    styles.button,
    variant && styles[`button--${variant}`]
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={buttonClass} onClick={onClick}>
      <span className={`${styles.button__icon} _icon-add`}></span>
      <span className={styles.button__text}>{text}</span>
    </button>
  );
};

export default Button;
