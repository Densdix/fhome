import Button from "@/shared/api/ui/Button/Button";
import styles from "./Photo.module.scss";

interface PhotoProps {
  id: number;
  url: string;
  onDelete: (id: number) => void;
}

const Photo = ({ id, url, onDelete }: PhotoProps) => {
  return (
    <div className={styles.photo}>
      <img 
        src={url} 
        alt="Company photo" 
        className={styles.photo__image}
      />
      <div className={styles.photo__deleteButton}>
        <Button
          variant="filled"
          icon="trash"
          onClick={() => onDelete(id)}
        />
      </div>
    </div>
  );
};

export default Photo; 