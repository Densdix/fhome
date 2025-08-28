import styles from './IconButton.module.scss';

interface IconButtonProps {
    icon: string;
    onClick: () => void;
}

const IconButton = ({ icon, onClick }: IconButtonProps) => {
    return <button className={styles.iconButton} onClick={onClick}>
      <span className={`${styles.button__icon} _icon-${icon}`}></span>
      </button>
}

export default IconButton;