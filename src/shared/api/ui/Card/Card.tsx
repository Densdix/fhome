import React, { useState } from 'react';
import styles from './Card.module.scss';
import Button from '../Button/Button';
import Input from '../Input/Input';
import Select from '../Select/Select';

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

type CardProps = {
  title: string;
  rows: CardRow[];
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

  const renderRow = (row: CardRow) => {
    if (row.type === 'multi-input') {
      return (
        <div key={row.label} className={styles.card__row}>
          <span className={styles.card__label}>{row.label}</span>
          <div className={styles.card__multiInput}>
            {row.parts.map((part, index) => (
              <div key={part.label} className={styles.card__multiInputPart}>
                {isEditing ? (
                  <Input
                    value={values[`${row.label}_${part.label}`]}
                    onChange={(e) => handleChange(`${row.label}_${part.label}`, e.target.value)}
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
    }

    return (
      <div key={row.label} className={styles.card__row}>
        <span className={styles.card__label}>{row.label}</span>
        {isEditing ? (
          row.type === 'select' ? (
            <Select
              value={values[row.label]}
              onChange={(e) => handleChange(row.label, e.target.value)}
              options={row.options || []}
            />
          ) : (
            <Input
              value={values[row.label]}
              onChange={(e) => handleChange(row.label, e.target.value)}
            />
          )
        ) : (
          <span className={styles.card__value}>{values[row.label]}</span>
        )}
      </div>
    );
  };

  return (
    <div className={styles.card}>
      <div className={styles.card__header}>
        <h3 className={styles.card__title}>{title}</h3>
        <div className={styles.card__actions}>
          {isEditing ? (
            <>
              <Button
                variant="fluttened"
                text="Save changes"
                icon="check"
                onClick={handleSave}
              />
              <Button
                variant="fluttened"
                text="Cancel"
                icon="x"
                onClick={handleCancel}
              />
            </>
          ) : (
            <Button
              variant="fluttened"
              text="Edit"
              icon="edit"
              onClick={handleEdit}
            />
          )}
        </div>
      </div>
      <div className={styles.card__content}>
        {rows.map(renderRow)}
      </div>
    </div>
  );
};

export default Card; 