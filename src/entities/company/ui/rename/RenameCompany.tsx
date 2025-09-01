import { useState } from "react";
import Modal from "@/shared/ui/Modal/Modal";
import Button from "@/shared/ui/Button/Button";
import Input from "@/shared/ui/Input/Input";
import styles from "./RenameCompany.module.scss";
import { companyStore } from "@/entities/company/store";
import { update } from "@/entities/company/api";
import { Loader } from "@/shared/ui/Loader/Loader";

interface RenameCompanyProps {
  isOpen: boolean;
  onClose: () => void;
}

const RenameCompany = ({ isOpen, onClose }: RenameCompanyProps) => {
  const [newName, setNewName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const company = companyStore.getCompany();

  const onRename = async () => {
    if (!company || !newName.trim()) return;
    setIsLoading(true);

    try {
      const updatedCompany = await update(company.id, {
        name: newName.trim(),
      });

      companyStore.updateCompany(updatedCompany);
      onClose();
      setNewName("");
    } catch (error) {
      console.error("Error renaming company:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onCancel = () => {
    setNewName("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onCancel}>
      <div className={styles.renameCompany}>
        <div className={styles.renameCompany__header}>
          <h3 className={styles.renameCompany__title}>Rename Organization</h3>
        </div>
        <div className={styles.renameCompany__input}>
          <Input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Enter new organization name"
          />
        </div>
        <div className={styles.renameCompany__buttons}>
          {isLoading ? (
            <div className={styles.renameCompany__loader}>
              <Loader size="small" />
            </div>
          ) : (
            <>
              <Button
                variant="outlined"
                text="Cancel"
                onClick={onCancel}
                disabled={isLoading}
              />
              <Button
                variant="filled"
                text="Rename"
                onClick={onRename}
                disabled={isLoading || !newName.trim()}
              />
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default RenameCompany;
