import React from 'react';
import styles from './Select.module.scss';

type Props = {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  options: { value: string; label: string }[];
};

const Select: React.FC<Props> = ({ placeholder, value, onChange, className, options }) => {
  const selectClass = [styles.select, className].filter(Boolean).join(' ');

  return (
    <div className={styles.selectWrapper}>
      <select
        className={selectClass}
        value={value}
        onChange={onChange}
      >
        {placeholder && <option value="" disabled>{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className={`${styles.chevron}`}><span className='_icon-chevron' /></div>
    </div>
  );
};

export default Select; 