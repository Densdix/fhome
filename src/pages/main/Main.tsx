import styles from "./Main.module.scss";
import Mainbar from "@/widgets/mainbar/Mainbar";
import Sidebar from "@/widgets/sidebar/Sidebar";
import { ReactNode } from "react";

interface MainProps {
  children?: ReactNode;
}

const Main = ({ children }: MainProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.container__mainBar}>
        <Mainbar />
      </div>
      <div className={styles.container__sidebar}>
        <Sidebar />
      </div>
      <div className={styles.container__content}>{children}</div>
    </div>
  );
};

export default Main;
