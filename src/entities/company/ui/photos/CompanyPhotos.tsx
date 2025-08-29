import Button from "@/shared/api/ui/Button/Button";
import CardContainer from "@/shared/api/ui/Card/CardContainer";
import CardHeader from "@/shared/api/ui/Card/CardHeader";
import styles from "./CompanyPhotos.module.scss";
import Photo from "./Photo";
import { observer } from "mobx-react-lite";
import { companyStore } from "@/entities/company/store";
import { useRef } from "react";
import { addImage, removeImage } from "@/entities/company/api";
import { IPhoto } from "@/entities/company/types";

const CompanyPhotos = observer(() => {
  const company = companyStore.getCompany();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { photos } = company || {};

  const onAddPhoto = () => {
    fileInputRef.current?.click();
  };

  const onDeletePhoto = (name: string) => {
    if (!company) return;
    removeImage(company.id, name).then((res) => {
      if (res) {
        companyStore.updateCompany({
          ...company,
          photos: company.photos.filter((photo) => photo.name !== name),
        });
      }
    });
  };

  const sendPhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !company) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("company_id", company.id.toString());
    addImage(company.id, file).then((res: IPhoto) => {
      companyStore.updateCompany({
        ...company,
        photos: [...company.photos, { 
          name: file.name, 
          filepath: res.filepath,
          thumbpath: res.thumbpath,
          createdAt: new Date().toISOString()
        }],
      });
    });
  };

  if (!company) return null;

  return (
    <>
      <input type="file" id="file" hidden ref={fileInputRef} onChange={sendPhoto} />
      <CardContainer>
        <CardHeader
          title="Photos"
        children={
          <>
            <Button
              variant="fluttened"
              text="Add"
              icon="addPhoto"
              onClick={onAddPhoto}
            />
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
            />
          ))}
          </div>
        </div>
      </CardContainer>
    </>
  );
});

export default CompanyPhotos;
