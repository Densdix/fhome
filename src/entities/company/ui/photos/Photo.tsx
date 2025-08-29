import Button from "@/shared/api/ui/Button/Button";
import styles from "./Photo.module.scss";

interface PhotoProps {
  name: string;
  url: string;
  onDelete: (name: string) => void;
}

const Photo = ({ name, url, onDelete }: PhotoProps) => {
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
          onClick={() => onDelete(name)}
        />
      </div>
    </div>
  );
};

export default Photo; 