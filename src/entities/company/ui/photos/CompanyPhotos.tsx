import Button from "@/shared/ui/Button/Button";
import CardContainer from "@/shared/ui/Card/CardContainer";
import CardHeader from "@/shared/ui/Card/CardHeader";
import styles from "./CompanyPhotos.module.scss";
import Photo from "./Photo";
import { observer } from "mobx-react-lite";
import { companyStore } from "@/entities/company/store";
import { useRef, useState } from "react";
import { addImage, removeImage } from "@/entities/company/api";
import { IPhoto } from "@/entities/company/types";
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

  const onDeletePhoto = (name: string) => {
    if (!company) return;
    setDeletingPhoto(name);
    removeImage(company.id, name).then((res) => {
      if (res) {
        companyStore.updateCompany({
          ...company,
          photos: company.photos.filter((photo) => photo.name !== name),
        });
      }
      setDeletingPhoto(null);
    });
  };

  const sendPhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !company) return;
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("company_id", company.id.toString());
    addImage(company.id, file).then((res: IPhoto | Error) => {
      if (res instanceof Error) {
        console.error('Error adding image:', res);
        return;
      }
      companyStore.updateCompany({
        ...company,
        photos: [
          ...company.photos,
          {
            name: file.name,
            filepath: res.filepath,
            thumbpath: res.thumbpath,
            createdAt: new Date().toISOString(),
          },
        ],
      });
      setIsUploading(false);
    }).finally(() => {
      setIsUploading(false);
    });
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
      />
      <CardContainer>
        <CardHeader
          title="Photos"
          children={
            <>
              {isUploading ? (
                <div className={styles.photos__loader}>
                  <Loader />
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
