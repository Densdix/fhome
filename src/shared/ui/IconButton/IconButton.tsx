import styles from "./IconButton.module.scss";

interface IconButtonProps {
  icon: string;
  onClick: () => void;
  color?: string;
}

const IconButton = ({ icon, onClick, color }: IconButtonProps) => {
  return (
    <button className={styles.iconButton} onClick={onClick}>
      <span 
        className={`${styles.iconButton__icon} _icon-${icon}`}
        style={{ color }}
      ></span>
    </button>
  );
};

export default IconButton;
