import CardContainer from "@/shared/ui/Card/CardContainer";
import CardHeader from "@/shared/ui/Card/CardHeader";
import CardRow from "@/shared/ui/Card/CardRow";
import Input from "@/shared/ui/Input/Input";
import { useEffect, useState } from "react";
import CardLabel from "@/shared/ui/Card/CardLabel";
import styles from "./Contact.module.scss";
import Button from "@/shared/ui/Button/Button";
import { contactStore } from "./store";
import { observer } from "mobx-react-lite";
import { updateContact } from "@/entities/contact/api";
import { convertToInitialPhoneFormat, formatPhoneNumber } from "./lib";
import { validateEmail, validatePhone } from "./lib";

const Contact = observer(() => {
  const [isEditing, setIsEditing] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const contact = contactStore.getContact();

  if (!contact) return null;

  const {
    firstname: initialFirstname,
    lastname: initialLastname,
    phone: initialPhone,
    email: initialEmail,
  } = contact;
  const [name, setName] = useState(`${initialFirstname} ${initialLastname}`);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState(initialEmail);

  const onSave = () => {
    const emailValidation = validateEmail(email);
    const phoneValidation = validatePhone(phone);

    setEmailError(emailValidation);
    setPhoneError(phoneValidation);

    if (emailValidation || phoneValidation) {
      return;
    }

    const [firstname, lastname] = name.split(" ");

    updateContact(contact.id, {
      firstname,
      lastname,
      phone: convertToInitialPhoneFormat(phone),
      email,
    }).then(() => {
      contactStore.updateContact({
        ...contact,
        firstname,
        lastname,
        phone: convertToInitialPhoneFormat(phone),
        email,
      });
      setIsEditing(false);
    });
  };

  const onCancel = () => {
    setName(`${initialFirstname} ${initialLastname}`);
    setPhone(initialPhone);
    setEmail(initialEmail);
    setEmailError("");
    setPhoneError("");
    setIsEditing(false);
  };

  const onResponsiblePersonChange = (value: string) => {
    setName(value);
  };

  const onPhoneChange = (value: string) => {
    setPhone(formatPhoneNumber(value));
  };

  const onEmailChange = (value: string) => {
    setEmail(value);
  };

  useEffect(() => {
    setPhone(formatPhoneNumber(initialPhone));
  }, [initialPhone]);

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
                value={name}
                onChange={(e) => onResponsiblePersonChange(e.target.value)}
              />
            ) : (
              <div className={styles.text}>{name}</div>
            )}
          </div>
        </CardRow>
        <CardRow>
          <div className={styles.column__first}>
            <CardLabel label="Phone Number:" />
          </div>
          <div className={styles.column__second}>
            {isEditing ? (
              <div className={styles.inputContainer}>
                <Input
                  placeholder="Enter phone number"
                  value={phone}
                  onChange={(e) => onPhoneChange(e.target.value)}
                />
                {phoneError && <div className={styles.error}>{phoneError}</div>}
              </div>
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
              <div className={styles.inputContainer}>
                <Input
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => onEmailChange(e.target.value)}
                />
                {emailError && <div className={styles.error}>{emailError}</div>}
              </div>
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
