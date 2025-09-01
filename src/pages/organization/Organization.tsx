import { useParams, useNavigate, useLocation } from "react-router-dom";
import styles from "./Organization.module.scss";
import Company from "@/widgets/company/Company";
import IconButton from "@/shared/ui/IconButton/IconButton";

const Organization = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const companyId = location.state?.companyId || id || "12";
  const contactId = location.state?.contactId || "16";

  const handleBackClick = () => {
    navigate("/organizations");
  };

  return (
    <div className={styles.organization}>
      <div className={styles.organization__backButton}>
        <IconButton icon="chevron" onClick={handleBackClick} />
      </div>
      <Company
        companyId={parseInt(companyId)}
        contactId={parseInt(contactId)}
      />
    </div>
  );
};

export default Organization;
