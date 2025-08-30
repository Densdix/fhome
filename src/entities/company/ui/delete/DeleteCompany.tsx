import Modal from "@/shared/ui/Modal/Modal";
import Button from "@/shared/ui/Button/Button";
import styles from "./DeleteCompany.module.scss";
import { companyStore } from "../../store";
import { remove } from "../../api";
import { Loader } from "@/shared/ui/Loader/Loader";
import { useState } from "react";

interface DeleteCompanyProps {
  isOpen: boolean;
  onClose: () => void;
}

const DeleteCompany = ({ isOpen, onClose }: DeleteCompanyProps) => {

  const company = companyStore.getCompany();
  const [isLoading, setIsLoading] = useState(false);

  const onCancel = () => {
    onClose();
  };

  const onRemove = () => {
    if (!company) return;
    setIsLoading(true);
    remove(company.id).then((res: boolean | Error) => {
      if (res instanceof Error) {
        console.error('Error removing company:', res);
        return;
      }
      companyStore.deleteCompany();
    }).finally(() => {
      setIsLoading(false);
      onClose();
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>
        <div className={styles.deleteCompany__header}>
          <h2 className={styles.deleteCompany__title}>
            Remove the Organization?
          </h2>
        </div>
        <div className={styles.deleteCompany__text}>
          Are you sure you want to remove this Organization?
        </div>
        {isLoading ? (
          <div className={styles.deleteCompany__loader}>
            <Loader />
          </div>
        ) : (
        <div className={styles.deleteCompany__buttons}>
          <Button variant="outlined" text="Cancel" onClick={onCancel} />
            <Button variant="filled" text="Yes, Remove" onClick={onRemove} />
          </div>
        )}
      </div>
    </Modal>
  );
};

export default DeleteCompany;
