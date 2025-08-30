import Button from "@/shared/ui/Button/Button";
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
          <div className={styles.photo__deleteButton__loader}>
            <Loader size="small" />
          </div>
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