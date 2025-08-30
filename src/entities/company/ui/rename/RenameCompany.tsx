import { useState } from "react";
import Modal from "@/shared/ui/Modal/Modal";
import Button from "@/shared/ui/Button/Button";
import Input from "@/shared/ui/Input/Input";
import styles from "./RenameCompany.module.scss";
import { observer } from "mobx-react-lite";
import { companyStore } from "@/entities/company/store";
import { update } from "@/entities/company/api";
import { ICompany } from "../../types";
import { Loader } from "@/shared/ui/Loader/Loader";

interface RenameCompanyProps {
  isOpen: boolean;
  onClose: () => void;
}

const RenameCompany = observer(({ isOpen, onClose }: RenameCompanyProps) => {
  const company = companyStore.getCompany();
  const [newName, setNewName] = useState(company?.name || "");
  const [isLoading, setIsLoading] = useState(false);

  const onCancel = () => {
    onClose();
    setNewName(company?.name || "");
  };

  const onRename = () => {
    if (!company) return;
    setIsLoading(true);
    update(company.id, { name: newName }).then((res: ICompany | Error) => {
      if (res instanceof Error) {
        console.error('Error renaming company:', res);
        return;
      }
      companyStore.updateCompany({ ...company, name: newName });
    }).finally(() => {
      setIsLoading(false);
      onClose();
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>
        <div className={styles.renameCompany__header}>
          <h2 className={styles.renameCompany__title}>
            Specify the Organization's name
          </h2>
        </div>
        <div className={styles.renameCompany__input}>
          <Input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Enter new organization name"
          />
        </div>
        {isLoading ? (
          <div className={styles.renameCompany__loader}>
            <Loader />
          </div>
        ) : (
          <div className={styles.renameCompany__buttons}>
            <Button variant="outlined" text="Cancel" onClick={onCancel} />
            <Button variant="filled" text="Save changes" onClick={onRename} />
          </div>
        )}
      </div>
    </Modal>
  );
});

export default RenameCompany;
