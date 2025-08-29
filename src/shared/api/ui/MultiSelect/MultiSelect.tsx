import React, { useState, useRef, useEffect } from 'react';
import styles from './MultiSelect.module.scss';

type Props = {
  placeholder?: string;
  value?: string[];
  onChange?: (values: string[]) => void;
  className?: string;
  options: { value: string; label: string }[];
};

const MultiSelect: React.FC<Props> = ({ placeholder, value = [], onChange, className, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>(value);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectClass = [styles.multiSelect, className].filter(Boolean).join(' ');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = (optionValue: string) => {
    const newValues = selectedValues.includes(optionValue)
      ? selectedValues.filter(v => v !== optionValue)
      : [...selectedValues, optionValue];
    
    setSelectedValues(newValues);
    onChange?.(newValues);
  };

  const displayText = selectedValues.length > 0
    ? options
        .filter(opt => selectedValues.includes(opt.value))
        .map(opt => opt.label)
        .join(', ')
    : placeholder || 'Select options';

  return (
    <div className={styles.multiSelectWrapper} ref={dropdownRef}>
      <div className={selectClass} onClick={() => setIsOpen(!isOpen)}>
        <span className={styles.multiSelect__text}>{displayText}</span>
        <span className={`${styles.chevron} ${isOpen ? styles.chevron__open : ''}`} />
      </div>
      {isOpen && (
        <div className={styles.multiSelect__dropdown}>
          {options.map(option => (
            <label key={option.value} className={styles.multiSelect__option}>
              <input
                type="checkbox"
                checked={selectedValues.includes(option.value)}
                onChange={() => handleToggle(option.value)}
                className={styles.multiSelect__checkbox}
              />
              <span className={styles.multiSelect__optionLabel}>{option.label}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelect; 