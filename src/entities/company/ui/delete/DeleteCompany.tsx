import Modal from "@/shared/api/ui/Modal/Modal";
import Button from "@/shared/api/ui/Button/Button";
import styles from "./DeleteCompany.module.scss";
import { companyStore } from "../../store";

interface DeleteCompanyProps {
  isOpen: boolean;
  onClose: () => void;
}

const DeleteCompany = ({ isOpen, onClose }: DeleteCompanyProps) => {

  const onCancel = () => {
    console.log("Cancel");
    onClose();
  };

  const onRemove = () => {
    companyStore.deleteCompany();
    onClose();
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
        <div className={styles.deleteCompany__buttons}>
          <Button variant="outlined" text="Cancel" onClick={onCancel} />
          <Button variant="filled" text="Yes, Remove" onClick={onRemove} />
        </div>
      </div>
    </Modal>
  );
};

export default DeleteCompany;
