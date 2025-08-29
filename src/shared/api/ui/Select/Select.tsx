import React, { useState, useRef, useEffect } from 'react';
import styles from './Select.module.scss';

type Props = {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  options: { value: string; label: string }[];
};

const Select: React.FC<Props> = ({ placeholder, value, onChange, className, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || '');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectClass = [styles.select, className].filter(Boolean).join(' ');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    setSelectedValue(optionValue);
    onChange?.(optionValue);
    setIsOpen(false);
  };

  const selectedLabel = options.find(opt => opt.value === selectedValue)?.label || placeholder || options[0]?.label || '';

  return (
    <div className={styles.selectWrapper} ref={dropdownRef}>
      <div
        className={selectClass}
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        tabIndex={0}
      >
        {selectedLabel}
      </div>
      <div className={`${styles.chevron} ${isOpen ? styles.rotated : ''}`}>
        <span className='_icon-chevron' />
      </div>
      {isOpen && (
        <div className={styles.dropdownList}>
          {options.map((option) => (
            <div
              key={option.value}
              className={`${styles.dropdownItem} ${selectedValue === option.value ? styles.selected : ''}`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select; 