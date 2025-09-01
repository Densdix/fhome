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
import { Loader } from "@/shared/ui/Loader/Loader";

const Contact = observer(() => {
  const [isEditing, setIsEditing] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
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

  const onSave = async () => {
    setIsSaving(true);
    const emailValidation = validateEmail(email);
    const phoneValidation = validatePhone(phone);

    setEmailError(emailValidation);
    setPhoneError(phoneValidation);

    if (emailValidation || phoneValidation) {
      setIsSaving(false);
      return;
    }

    try {
      const [firstname, lastname] = name.split(" ");

      const updatedContact = await updateContact(contact.id, {
        firstname,
        lastname,
        phone: convertToInitialPhoneFormat(phone),
        email,
      });

      contactStore.updateContact(updatedContact);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating contact:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const onCancel = () => {
    setName(`${initialFirstname} ${initialLastname}`);
    setPhone(initialPhone);
    setEmail(initialEmail);
    setEmailError("");
    setPhoneError("");
    setIsEditing(false);
  };

  const onResponsiblePersonChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setName(e.target.value);
  };

  const onPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhoneNumber(e.target.value));
  };

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
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
                {isSaving ? (
                  <div className={styles.actions__loader}>
                    <Loader size="small" />
                  </div>
                ) : (
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
                )}
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
              <div className={styles.inputContainer}>
                <Input
                  value={name}
                  onChange={onResponsiblePersonChange}
                  placeholder="Enter responsible person name"
                />
              </div>
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
                  value={phone}
                  onChange={onPhoneChange}
                  placeholder="Enter phone number"
                />
                {phoneError && <div className={styles.error}>{phoneError}</div>}
              </div>
            ) : (
              <div className={styles.text}>{phone}</div>
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
                  value={email}
                  onChange={onEmailChange}
                  placeholder="Enter email address"
                />
                {emailError && <div className={styles.error}>{emailError}</div>}
              </div>
            ) : (
              <div className={styles.text}>{email}</div>
            )}
          </div>
        </CardRow>
      </div>
    </CardContainer>
  );
});

export default Contact;
