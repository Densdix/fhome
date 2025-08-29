import styles from "./Main.module.scss";
import Mainbar from "@/widgets/mainbar/Mainbar";
import Sidebar from "@/widgets/sidebar/Sidebar";
import Company from "@/widgets/company/Company";

const Main = () => {

  return (
    <div className={styles.container}>
      <div className={styles.container__mainBar}>
        <Mainbar />
      </div>
      <div className={styles.container__sidebar}>
        <Sidebar />
      </div>
      <div className={styles.container__content}>
        <Company companyId={12} contactId={16} />
      </div>
    </div>
  );
};

export default Main;
