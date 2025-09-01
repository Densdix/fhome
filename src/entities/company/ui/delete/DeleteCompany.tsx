import Modal from "@/shared/ui/Modal/Modal";
import Button from "@/shared/ui/Button/Button";
import styles from "./DeleteCompany.module.scss";
import { companyStore } from "@/entities/company/store";
import { remove } from "@/entities/company/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "@/shared/ui/Loader/Loader";

interface DeleteCompanyProps {
  isOpen: boolean;
  onClose: () => void;
}

const DeleteCompany = ({ isOpen, onClose }: DeleteCompanyProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const company = companyStore.getCompany();

  const onRemove = async () => {
    if (!company) return;
    setIsLoading(true);

    try {
      await remove(company.id);
      companyStore.deleteCompany();
      onClose();
      navigate("/organizations");
    } catch (error) {
      console.error("Error deleting company:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.deleteCompany}>
        <div className={styles.deleteCompany__header}>
          <h3 className={styles.deleteCompany__title}>Delete Organization</h3>
        </div>
        <p className={styles.deleteCompany__text}>
          Are you sure you want to delete "{company?.name}"? This action cannot
          be undone.
        </p>
        <div className={styles.deleteCompany__buttons}>
          {isLoading ? (
            <div className={styles.deleteCompany__loader}>
              <Loader size="small" />
            </div>
          ) : (
            <>
              <Button
                variant="outlined"
                text="Cancel"
                onClick={onClose}
                disabled={isLoading}
              />
              <Button
                variant="filled"
                text="Delete"
                onClick={onRemove}
                disabled={isLoading}
              />
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default DeleteCompany;
