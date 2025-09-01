import Button from "@/shared/ui/Button/Button";
import styles from "./Sidebar.module.scss";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleOrganizationsClick = () => {
    navigate("/organizations");
  };

  const handleContractorsClick = () => {
    navigate("/contractors");
  };

  const handleClientsClick = () => {
    navigate("/clients");
  };

  const isOrganizationsActive =
    location.pathname === "/organizations" ||
    location.pathname.startsWith("/organization/");
  const isContractorsActive = location.pathname === "/contractors";
  const isClientsActive = location.pathname === "/clients";

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar__header}>
        <div className={styles.sidebar__header__title}>Oak Tree Cemetery</div>
        <div className={styles.sidebar__header__subtitle}>Process Manager</div>
      </div>
      <div className={styles.sidebar__content}>
        <Button
          variant={isOrganizationsActive ? "filled" : "outlined"}
          text="Organizations"
          icon="company"
          onClick={handleOrganizationsClick}
        />
        <Button
          variant={isContractorsActive ? "filled" : "outlined"}
          text="Contractors"
          icon="contractor"
          onClick={handleContractorsClick}
        />
        <Button
          variant={isClientsActive ? "filled" : "outlined"}
          text="Clients"
          icon="account"
          onClick={handleClientsClick}
        />
      </div>
      <div className={styles.sidebar__footer}>
        <div className={styles.sidebar__footer__text}>
          All Funeral Services © 2015-2025
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
