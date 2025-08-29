import React from 'react';
import styles from './index.module.scss';
import Input from '@/shared/api/ui/Input/Input';

type CardMultiInputProps = {
  row: {
    label: string;
    parts: {
      label: string;
      value: string;
    }[];
  };
  isEditing: boolean;
  values: Record<string, string>;
  onChange: (key: string, value: string) => void;
};

const CardMultiInput: React.FC<CardMultiInputProps> = ({
  row,
  isEditing,
  values,
  onChange,
}) => {
  return (
    <div className={styles.card__row}>
      <span className={styles.card__label}>{row.label}</span>
      <div className={styles.card__multiInput}>
        {row.parts.map((part, index) => (
          <div key={part.label} className={styles.card__multiInputPart}>
            {isEditing ? (
              <Input
                value={values[`${row.label}_${part.label}`]}
                onChange={(e) => onChange(`${row.label}_${part.label}`, e.target.value)}
              />
            ) : (
              <>
                <span className={styles.card__value}>{values[`${row.label}_${part.label}`]}</span>
                {index < row.parts.length - 1 && (
                  <span className={styles.card__multiInputSeparator}>/</span>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardMultiInput; 