import { useState } from "react";
import styles from "./Company.module.scss";
import IconButton from "@/shared/api/ui/IconButton/IconButton";
import CompanyDetails from "@/entities/company/ui/details/CompanyDetails";
import CompanyPhotos from "@/entities/company/ui/photos/CompanyPhotos";
import CompanyContacts from "@/entities/contact/Contact";
import RenameCompany from "@/entities/company/ui/rename/RenameCompany";
import DeleteCompany from "@/entities/company/ui/delete/DeleteCompany";

const Company = () => {
  const [isRenameOpen, setIsRenameOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <>
      <div className={styles.company}>
        <div className={styles.company__sideActions}>
          <div className={styles.company__sideActions__button}>
            <IconButton icon="chevron" onClick={() => {}} />
          </div>
        </div>
        <div className={styles.company__main}>
          <div className={styles.company__main__header}>
            <div className={styles.company__main__header__title}>
              Eternal Rest Funeral Home
            </div>
            <div className={styles.company__main__header__actions}>
              <IconButton icon="edit" onClick={() => setIsRenameOpen(true)} />
              <IconButton icon="trash" color="#D72323" onClick={() => setIsDeleteOpen(true)} />
            </div>
          </div>
          <div className={styles.company__main__content}>
            <CompanyDetails />
            <CompanyContacts />
            <CompanyPhotos />
          </div>
        </div>
      </div>
      <RenameCompany isOpen={isRenameOpen} onClose={() => setIsRenameOpen(false)} />
      <DeleteCompany isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} />
    </>
  );
};

export default Company;
