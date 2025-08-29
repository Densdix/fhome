import { useState } from "react";
import Modal from "@/shared/api/ui/Modal/Modal";
import Button from "@/shared/api/ui/Button/Button";
import styles from "./DeleteCompany.module.scss";

const DeleteCompany = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onCancel = () => {
    console.log("Cancel");
    setIsOpen(false);
  };

  const onRemove = () => {
    console.log("Remove");
    setIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <div>
        <div className={styles.deleteCompany__header}>
          <h2 className={styles.deleteCompany__title}>
            Remove the Organization?
          </h2>
        </div>
        <div className={styles.deleteCompany__text}>
          Are you sure you want to remove this Organization?
        </div>
        <div className={styles.deleteCompany__buttons}>
          <Button variant="outlined" text="Cancel" onClick={onCancel} />
          <Button variant="filled" text="Yes, Remove" onClick={onRemove} />
        </div>
      </div>
    </Modal>
  );
};

export default DeleteCompany;
