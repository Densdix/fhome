import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Organizations.module.scss";
import { Loader } from "@/shared/ui/Loader/Loader";
import { getOrganizations } from "@/entities/company/api";
import { ICompany } from "@/entities/company/types";

const Organizations = () => {
  const navigate = useNavigate();
  const [organizations, setOrganizations] = useState<ICompany[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadOrganizations = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getOrganizations();
        setOrganizations(data);
      } catch (err) {
        setError("Failed to load organizations");
        console.error("Error fetching organizations:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadOrganizations();
  }, []);

  const handleOrganizationClick = (organization: ICompany) => {
    navigate(`/organization/${organization.id}`, {
      state: {
        companyId: organization.id,
        contactId: organization.contactId,
      },
    });
  };

  if (isLoading) {
    return (
      <div className={styles.organizations__loader}>
        <Loader size="large" />
      </div>
    );
  }

  if (error) {
    return <div className={styles.organizations__error}>Error: {error}</div>;
  }

  return (
    <div className={styles.organizations}>
      <div className={styles.organizations__header}>
        <h1 className={styles.organizations__title}>Organizations</h1>
      </div>
      <div className={styles.organizations__content}>
        {organizations.map((organization) => (
          <div
            key={organization.id}
            className={styles.organizationCard}
            onClick={() => handleOrganizationClick(organization)}
          >
            <div className={styles.organizationCard__header}>
              <h3 className={styles.organizationCard__name}>
                {organization.name}
              </h3>
              <span className={styles.organizationCard__shortName}>
                {organization.shortName}
              </span>
            </div>
            <div className={styles.organizationCard__details}>
              <div className={styles.organizationCard__detail}>
                <span className={styles.organizationCard__label}>
                  Business Entity:
                </span>
                <span className={styles.organizationCard__value}>
                  {organization.businessEntity}
                </span>
              </div>
              <div className={styles.organizationCard__detail}>
                <span className={styles.organizationCard__label}>
                  Contract:
                </span>
                <span className={styles.organizationCard__value}>
                  {organization.contract.no}
                </span>
              </div>
              <div className={styles.organizationCard__detail}>
                <span className={styles.organizationCard__label}>Type:</span>
                <span className={styles.organizationCard__value}>
                  {organization.type
                    .map((type) =>
                      type
                        .replace(/_/g, " ")
                        .replace(/\b\w/g, (l) => l.toUpperCase())
                    )
                    .join(", ")}
                </span>
              </div>
            </div>
            <div className={styles.organizationCard__status}>
              <span
                className={`${styles.organizationCard__statusBadge} ${styles.organizationCard__statusBadge_active}`}
              >
                {organization.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Organizations;
