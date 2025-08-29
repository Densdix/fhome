import React from 'react';
import styles from './index.module.scss';
import Button from '@/shared/api/ui/Button/Button';

type CardHeaderProps = {
  title: string;
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
};

const CardHeader: React.FC<CardHeaderProps> = ({
  title,
  isEditing,
  onEdit,
  onSave,
  onCancel,
}) => {
  return (
    <div className={styles.card__header}>
      <h3 className={styles.card__title}>{title}</h3>
      <div className={styles.card__actions}>
        {isEditing ? (
          <>
            <Button
              variant="fluttened"
              text="Save changes"
              icon="check"
              onClick={onSave}
            />
            <Button
              variant="fluttened"
              text="Cancel"
              icon="x"
              onClick={onCancel}
            />
          </>
        ) : (
          <Button
            variant="fluttened"
            text="Edit"
            icon="edit"
            onClick={onEdit}
          />
        )}
      </div>
    </div>
  );
};

export default CardHeader; 