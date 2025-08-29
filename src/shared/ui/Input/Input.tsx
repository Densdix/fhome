import React from "react";
import styles from "./Input.module.scss";

type Props = {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  type?: string;
  pattern?: string;
};

const Input: React.FC<Props> = ({
  placeholder,
  value,
  onChange,
  className,
  type,
  pattern,
}) => {
  const inputClass = [styles.input, className].filter(Boolean).join(" ");

  return (
    <input
      className={inputClass}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      type={type}
      pattern={pattern}
    />
  );
};

export default Input;
