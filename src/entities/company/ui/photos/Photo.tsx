import Button from "@/shared/api/ui/Button/Button";
import styles from "./Photo.module.scss";
import { Loader } from "@/shared/ui/Loader/Loader";

interface PhotoProps {
  name: string;
  url: string;
  onDelete: (name: string) => void;
  isDeleting?: boolean;
}

const Photo = ({ name, url, onDelete, isDeleting }: PhotoProps) => {
  return (
    <div className={styles.photo}>
      <img 
        src={url} 
        alt="Company photo" 
        className={styles.photo__image}
      />
      <div className={styles.photo__deleteButton}>
        {isDeleting ? (
          <Loader size="small" />
        ) : (
          <Button
            variant="filled"
            icon="trash"
            onClick={() => onDelete(name)}
          />
        )}
      </div>
    </div>
  );
};

export default Photo; 