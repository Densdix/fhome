import { useState } from "react";
import Modal from "@/shared/api/ui/Modal/Modal";
import Button from "@/shared/api/ui/Button/Button";
import Input from "@/shared/api/ui/Input/Input";
import styles from "./RenameCompany.module.scss";
import { observer } from "mobx-react-lite";
import { companyStore } from "@/entities/company/store";
import { update } from "@/entities/company/api";
import { ICompany } from "../../types";

interface RenameCompanyProps {
  isOpen: boolean;
  onClose: () => void;
}

const RenameCompany = observer(({ isOpen, onClose }: RenameCompanyProps) => {
  const company = companyStore.getCompany();
  const [newName, setNewName] = useState(company?.name || "");

  const onCancel = () => {
    onClose();
    setNewName(company?.name || "");
  };

  const onRename = () => {
    if (!company) return;
    onClose();
    update(company.id, { name: newName }).then((res: ICompany | Error) => {
      if (res instanceof Error) {
        console.error('Error renaming company:', res);
        return;
      }
      companyStore.updateCompany({ ...company, name: newName });
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
        <div className={styles.renameCompany__buttons}>
          <Button variant="outlined" text="Cancel" onClick={onCancel} />
          <Button variant="filled" text="Save changes" onClick={onRename} />
        </div>
      </div>
    </Modal>
  );
});

export default RenameCompany;
