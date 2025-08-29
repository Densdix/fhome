import CardContainer from "@/shared/api/ui/Card/CardContainer";
import CardHeader from "@/shared/api/ui/Card/CardHeader";
import CardRow from "@/shared/api/ui/Card/CardRow";
import Input from "@/shared/api/ui/Input/Input";
import { useState } from "react";
import CardLabel from "@/shared/api/ui/Card/CardLabel";
import styles from "./Contact.module.scss";

const Contact = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [responsiblePerson, setResponsiblePerson] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  return (
    <CardContainer>
      <CardHeader
        title="Contact Information"
        isEditing={isEditing}
        onEdit={() => setIsEditing(true)}
        onSave={() => setIsEditing(false)}
        onCancel={() => setIsEditing(false)}
      />
      <div className={styles.rows}>
        <CardRow>
          <div className={styles.column__first}>
            <CardLabel label="Responsible Person:" />
          </div>
          <div className={styles.column__second}>
            {isEditing ? (
              <Input
                placeholder="Enter responsible person name"
                value={responsiblePerson}
                onChange={(e) => setResponsiblePerson(e.target.value)}
              />
            ) : (
              <div className={styles.text}>{responsiblePerson || "-"}</div>
            )}
          </div>
        </CardRow>
        <CardRow>
          <div className={styles.column__first}>
            <CardLabel label="Phone Number:" />
          </div>
          <div className={styles.column__second}>
            {isEditing ? (
              <Input
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            ) : (
              <div className={styles.text}>{phoneNumber || "-"}</div>
            )}
          </div>
        </CardRow>
        <CardRow>
          <div className={styles.column__first}>
            <CardLabel label="E-mail:" />
          </div>
          <div className={styles.column__second}>
            {isEditing ? (
              <Input
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            ) : (
              <div className={styles.text}>{email || "-"}</div>
            )}
          </div>
        </CardRow>
      </div>
    </CardContainer>
  );
};

export default Contact;
