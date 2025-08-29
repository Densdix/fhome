import { useState } from "react";
import Modal from "@/shared/api/ui/Modal/Modal";
import Button from "@/shared/api/ui/Button/Button";
import Input from "@/shared/api/ui/Input/Input";
import styles from "./RenameCompany.module.scss";

interface RenameCompanyProps {
  isOpen: boolean;
  onClose: () => void;
}

const RenameCompany = ({ isOpen, onClose }: RenameCompanyProps) => {
  const [newName, setNewName] = useState("");

  const onCancel = () => {
    console.log("Cancel");
    onClose();
    setNewName("");
  };

  const onRename = () => {
    console.log("Rename to:", newName);
    onClose();
    setNewName("");
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
};

export default RenameCompany;
