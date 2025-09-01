import Button from "@/shared/ui/Button/Button";
import CardContainer from "@/shared/ui/Card/CardContainer";
import CardHeader from "@/shared/ui/Card/CardHeader";
import styles from "./CompanyPhotos.module.scss";
import Photo from "./Photo";
import { observer } from "mobx-react-lite";
import { companyStore } from "@/entities/company/store";
import { useRef, useState } from "react";
import { addImage, removeImage } from "@/entities/company/api";
import { Loader } from "@/shared/ui/Loader/Loader";

const CompanyPhotos = observer(() => {
  const company = companyStore.getCompany();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [deletingPhoto, setDeletingPhoto] = useState<string | null>(null);

  const { photos } = company || {};

  const onAddPhoto = () => {
    fileInputRef.current?.click();
  };

  const onDeletePhoto = async (name: string) => {
    if (!company) return;
    setDeletingPhoto(name);

    try {
      await removeImage(company.id, name);
      companyStore.updateCompany({
        ...company,
        photos: company.photos.filter((photo) => photo.name !== name),
      });
    } catch (error) {
      console.error("Error deleting photo:", error);
    } finally {
      setDeletingPhoto(null);
    }
  };

  const sendPhoto = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !company) return;

    setIsUploading(true);

    try {
      const newPhoto = await addImage(company.id, file);

      companyStore.updateCompany({
        ...company,
        photos: [...company.photos, newPhoto],
      });
    } catch (error) {
      console.error("Error adding image:", error);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  if (!company) return null;

  return (
    <>
      <input
        type="file"
        id="file"
        hidden
        ref={fileInputRef}
        onChange={sendPhoto}
        accept="image/*"
      />
      <CardContainer>
        <CardHeader
          title="Photos"
          children={
            <>
              {isUploading ? (
                <div className={styles.photos__loader}>
                  <Loader size="small" />
                </div>
              ) : (
                <Button
                  variant="fluttened"
                  text="Add"
                  icon="addPhoto"
                  onClick={onAddPhoto}
                  disabled={isUploading}
                />
              )}
            </>
          }
        />
        <div className={styles.photos}>
          <div className={styles.photos__item}>
            {photos?.map((photo) => (
              <Photo
                key={photo.name}
                name={photo.name}
                url={photo.filepath}
                onDelete={onDeletePhoto}
                isDeleting={deletingPhoto === photo.name}
              />
            ))}
          </div>
        </div>
      </CardContainer>
    </>
  );
});

export default CompanyPhotos;
