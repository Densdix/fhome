import Button from "@/shared/api/ui/Button/Button";
import CardContainer from "@/shared/api/ui/Card/CardContainer";
import CardHeader from "@/shared/api/ui/Card/CardHeader";
import styles from "./CompanyPhotos.module.scss";
import { useState } from "react";
import photo1 from "@/assets/1.png";
import photo2 from "@/assets/2.png";
import photo3 from "@/assets/3.png";
import Photo from "./Photo";

const fakePhotos = [
  {
    id: 1,
    url: photo1,
  },
  {
    id: 2,
    url: photo2,
  },
  {
    id: 3,
    url: photo3,
  },
];

const CompanyPhotos = () => {
  const [photos, setPhotos] = useState<{ id: number; url: string }[]>(
    fakePhotos
  );

  const onAddPhoto = () => {
    console.log("Add photo");
  };

  const onDeletePhoto = (id: number) => {
    setPhotos(photos.filter(photo => photo.id !== id));
  };

  return (
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
          {photos.map((photo) => (
            <Photo
              key={photo.id}
              id={photo.id}
              url={photo.url}
              onDelete={onDeletePhoto}
            />
          ))}
        </div>
      </div>
    </CardContainer>
  );
};

export default CompanyPhotos;
