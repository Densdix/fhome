import React, { useState } from 'react';
import styles from './index.module.scss';
import CardHeader from './CardHeader';
import CardRow from './CardRow';

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

type CardRowType = CardRowInput | CardRowMultiInput;

type CardProps = {
  title: string;
  rows: CardRowType[];
  onSave?: (values: Record<string, string>) => void;
};

const Card: React.FC<CardProps> = ({ title, rows, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [values, setValues] = useState<Record<string, string>>(
    rows.reduce((acc, row) => {
      if (row.type === 'multi-input') {
        return {
          ...acc,
          ...row.parts.reduce((partAcc, part) => ({
            ...partAcc,
            [`${row.label}_${part.label}`]: part.value
          }), {})
        };
      }
      return { ...acc, [row.label]: row.value };
    }, {})
  );

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    onSave?.(values);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setValues(rows.reduce((acc, row) => {
      if (row.type === 'multi-input') {
        return {
          ...acc,
          ...row.parts.reduce((partAcc, part) => ({
            ...partAcc,
            [`${row.label}_${part.label}`]: part.value
          }), {})
        };
      }
      return { ...acc, [row.label]: row.value };
    }, {}));
  };

  const handleChange = (key: string, value: string) => {
    setValues(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className={styles.card}>
      <CardHeader
        title={title}
        isEditing={isEditing}
        onEdit={handleEdit}
        onSave={handleSave}
        onCancel={handleCancel}
      />
      <div className={styles.card__content}>
        {rows.map((row) => (
          <CardRow
            key={row.label}
            row={row}
            isEditing={isEditing}
            values={values}
            onChange={handleChange}
          />
        ))}
      </div>
    </div>
  );
};

export default Card; 