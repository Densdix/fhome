import React from "react";
import styles from "./Button.module.scss";

type Props = {
  variant?: "filled" | "outlined" | "fluttened";
  text?: string;
  icon?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

const Button: React.FC<Props> = ({
  variant = "filled",
  text,
  icon,
  onClick,
  disabled = false,
  type = "button",
}) => {
  const buttonClass = [
    styles.button,
    styles[`button--${variant}`],
    text ? styles["button--withText"] : styles["button--noText"],
    disabled ? styles["button--disabled"] : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {icon && (
        <span className={styles.button__icon}>
          <span className={`_icon-${icon}`}></span>
        </span>
      )}
      {text && (
        <div className={styles.button__text_container}>
          <span className={styles.button__text_container__text}>{text}</span>
        </div>
      )}
    </button>
  );
};

export default Button;
