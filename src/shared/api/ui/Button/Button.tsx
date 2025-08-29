// Button.tsx
import React from 'react';
import styles from './Button.module.scss';

type Props = {
  variant?: 'filled' | 'outlined' | 'fluttened';
  iconUrl?: string;
  text?: string;
  onClick?: () => void;
  icon?: string;
};

const Button: React.FC<Props> = ({ variant, text, onClick, icon }) => {
  const buttonClass = [
    styles.button,
    variant && styles[`button--${variant}`],
    !text && styles.button__noText,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={buttonClass} onClick={onClick}>
      <span className={`${styles.button__icon} _icon-${icon}`}></span>
      <span className={styles.button__text_container}>
        {text && <span className={styles.button__text}>{text}</span>}
      </span>
    </button>
  );
};

export default Button;
