import CardContainer from "@/shared/api/ui/Card/CardContainer";
import CardHeader from "@/shared/api/ui/Card/CardHeader";
import CardRow from "@/shared/api/ui/Card/CardRow";
import CardLabel from "@/shared/api/ui/Card/CardLabel";
import styles from "./CompanyDetails.module.scss";
import Button from "@/shared/api/ui/Button/Button";
import { companyStore } from "@/entities/company/store";
import { observer } from "mobx-react-lite";
import { formatDate, snakeToRegular } from "./lib";
import CompanyDetailsEdit from "./CompanyDetailsEdit";
import { useState, useEffect } from "react";

const CompanyDetails = observer(() => {
  const company = companyStore.getCompany();
  const { contract, businessEntity, type } = company || {};
  const { no, issue_date } = contract || {};
  const [isEditing, setIsEditing] = useState(false);
  const [date, setDate] = useState<string | undefined>(formatDate(issue_date));
  const [types, setTypes] = useState<{ value: string; label: string }[] | undefined>(
    type?.map((type: string) => ({ value: type, label: snakeToRegular(type) }))
  );

  useEffect(() => {
    setDate(formatDate(issue_date));
    setTypes(type?.map((type: string) => ({ value: type, label: snakeToRegular(type) })));
  }, [issue_date, type]);

  if (!company) return null;

  if (isEditing) {
    return (
      <CompanyDetailsEdit setIsEditing={setIsEditing} />
    );
  }

  return (
    <CardContainer>
      <CardHeader
        title="Details"
        children={
          <Button
            variant="fluttened"
            text="Edit"
            icon="edit"
            onClick={() => setIsEditing(true)}
          />
        }
      />
      <div className={styles.rows}>
        <CardRow>
          <div className={styles.column__first}>
            <CardLabel label="Agreement:" />
          </div>
          <div className={`${styles.column__second} ${styles.agreement__container}`}>
            <div className={styles.text}>
              {no || "-"}{" "}
              {date && <span className={styles.slash}>{'/'}</span>}
              {date && date}
            </div>
          </div>
        </CardRow>
        <CardRow>
          <div className={styles.column__first}>
            <CardLabel label="Buisness entity:" />
          </div>
          <div className={styles.column__second}>
            <div className={styles.text}>{businessEntity || "-"}</div>
          </div>
        </CardRow>
        <CardRow>
          <div className={styles.column__first}>
            <CardLabel label="Company type:" />
          </div>
          <div className={styles.column__second}>
            <div className={styles.text}>
              {types?.map((type) => type.label).join(", ") || "-"}
            </div>
          </div>
        </CardRow>
      </div>
    </CardContainer>
  );
});

export default CompanyDetails;
