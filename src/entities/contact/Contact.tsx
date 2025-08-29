import CardContainer from "@/shared/api/ui/Card/CardContainer";
import CardHeader from "@/shared/api/ui/Card/CardHeader";
import CardRow from "@/shared/api/ui/Card/CardRow";
import Input from "@/shared/api/ui/Input/Input";
import { useState } from "react";
import CardLabel from "@/shared/api/ui/Card/CardLabel";
import styles from "./Contact.module.scss";
import Button from "@/shared/api/ui/Button/Button";
import { contactStore } from "./store";
import { observer } from "mobx-react-lite";
import { updateContact } from "@/entities/contact/api";

const Contact = observer(() => {
  const [isEditing, setIsEditing] = useState(false);

  const contact = contactStore.getContact();

  if (!contact) return null;

  const {
    firstname: initialFirstname,
    lastname: initialLastname,
    phone: initialPhone,
    email: initialEmail,
  } = contact;
  const [firstname, setFirstname] = useState(initialFirstname);
  const [lastname, setLastname] = useState(initialLastname);
  const [phone, setPhone] = useState(initialPhone);
  const [email, setEmail] = useState(initialEmail);

  const onSave = () => {
    updateContact(contact.id, {
      firstname,
      lastname,
      phone,
      email,
    }).then(() => {
      contactStore.updateContact({
        ...contact,
        firstname,
        lastname,
        phone,
        email,
      });
      setIsEditing(false);
    });
  };

  const onCancel = () => {
    setFirstname(initialFirstname);
    setLastname(initialLastname);
    setPhone(initialPhone);
    setEmail(initialEmail);
    setIsEditing(false);
  };

  const onResponsiblePersonChange = (value: string) => {
    const [firstname, lastname] = value.split(" ");
    setFirstname(firstname);
    setLastname(lastname);
  };

  const onPhoneNumberChange = (value: string) => {
    setPhone(value);
  };

  const onEmailChange = (value: string) => {
    setEmail(value);
  };

  return (
    <CardContainer>
      <CardHeader
        title="Contact Information"
        children={
          <>
            {isEditing ? (
              <>
                <Button
                  variant="fluttened"
                  text="Save changes"
                  icon="check"
                  onClick={onSave}
                />
                <Button
                  variant="fluttened"
                  text="Cancel"
                  icon="x"
                  onClick={onCancel}
                />
              </>
            ) : (
              <Button
                variant="fluttened"
                text="Edit"
                icon="edit"
                onClick={() => setIsEditing(true)}
              />
            )}
          </>
        }
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
                value={`${firstname} ${lastname}`}
                onChange={(e) => onResponsiblePersonChange(e.target.value)}
              />
            ) : (
              <div className={styles.text}>
                {firstname && lastname ? `${firstname} ${lastname}` : "-"}
              </div>
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
                value={phone}
                onChange={(e) => onPhoneNumberChange(e.target.value)}
              />
            ) : (
              <div className={styles.text}>{phone || "-"}</div>
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
                onChange={(e) => onEmailChange(e.target.value)}
              />
            ) : (
              <div className={styles.text}>{email || "-"}</div>
            )}
          </div>
        </CardRow>
      </div>
    </CardContainer>
  );
});

export default Contact;
