import React from 'react';
import styles from './index.module.scss';
import Input from '@/shared/api/ui/Input/Input';
import Select from '@/shared/api/ui/Select/Select';
import CardMultiInput from './CardMultiInput';

type CardRowInput = {
  label: string;
  value: string;
  type?: 'text' | 'select';
  options?: { value: string; label: string }[];
};

type CardRowMultiInput = {
  label: string;
  value: string;
  type: 'multi-input';
  parts: {
    label: string;
    value: string;
  }[];
};

type CardRow = CardRowInput | CardRowMultiInput;

type CardRowProps = {
  row: CardRow;
  isEditing: boolean;
  values: Record<string, string>;
  onChange: (key: string, value: string) => void;
};

const CardRow: React.FC<CardRowProps> = ({ row, isEditing, values, onChange }) => {
  if (row.type === 'multi-input') {
    return <CardMultiInput row={row} isEditing={isEditing} values={values} onChange={onChange} />;
  }

  return (
    <div className={styles.card__row}>
      <span className={styles.card__label}>{row.label}</span>
      {isEditing ? (
        row.type === 'select' ? (
          <Select
            value={values[row.label]}
            onChange={(value) => onChange(row.label, value)}
            options={row.options || []}
          />
        ) : (
          <Input
            value={values[row.label]}
            onChange={(e) => onChange(row.label, e.target.value)}
          />
        )
      ) : (
        <span className={styles.card__value}>{values[row.label]}</span>
      )}
    </div>
  );
};

export default CardRow; 