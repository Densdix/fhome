import IconButton from "@/shared/ui/IconButton/IconButton";
import styles from "./Photo.module.scss";
import { Loader } from "@/shared/ui/Loader/Loader";

interface PhotoProps {
  name: string;
  url: string;
  onDelete: (name: string) => void;
  isDeleting?: boolean;
}

const Photo = ({ name, url, onDelete, isDeleting }: PhotoProps) => {
  const handleDelete = async () => {
    try {
      await onDelete(name);
    } catch (error) {
      console.error("Error deleting photo:", error);
    }
  };

  return (
    <div className={styles.photo}>
      <img src={url} alt="Company photo" className={styles.photo__image} />
      <div className={styles.photo__deleteButton}>
        {isDeleting ? (
          <div className={styles.photo__deleteButton__loader}>
            <Loader size="small" />
          </div>
        ) : (
          <IconButton icon="trash" onClick={handleDelete} color="#FFFFFF" />
        )}
      </div>
    </div>
  );
};

export default Photo;
