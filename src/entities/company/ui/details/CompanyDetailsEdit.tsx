import CardContainer from "@/shared/api/ui/Card/CardContainer";
import CardHeader from "@/shared/api/ui/Card/CardHeader";
import CardRow from "@/shared/api/ui/Card/CardRow";
import Input from "@/shared/api/ui/Input/Input";
import Select from "@/shared/api/ui/Select/Select";
import MultiSelect from "@/shared/api/ui/MultiSelect/MultiSelect";
import CardLabel from "@/shared/api/ui/Card/CardLabel";
import styles from "./CompanyDetails.module.scss";
import Button from "@/shared/api/ui/Button/Button";
import { companyStore } from "@/entities/company/store";
import { observer } from "mobx-react-lite";
import { formatDateForInput, snakeToRegular } from "./lib";
import { ICompany, IContract } from "@/entities/company/types";
import { update } from "@/entities/company/api";
import { useEffect, useState } from "react";

interface CompanyDetailsEditProps {
  setIsEditing: (isEditing: boolean) => void;
}

const CompanyDetailsEdit = observer(
  ({ setIsEditing }: CompanyDetailsEditProps) => {
    const company = companyStore.getCompany();

    const {
      contract: initialContract,
      businessEntity: initialBusinessEntity,
      type: initialType,
    } = company || {};

    const { no, issue_date } = initialContract || {};

    const [contract, setContract] = useState<IContract>(
      initialContract as IContract
    );
    const [businessEntity, setBusinessEntity] = useState<string>(
      initialBusinessEntity || ""
    );
    const [type, setType] = useState<string[]>(initialType || []);

    const types = initialType?.map((type: string) => ({
      value: type,
      label: snakeToRegular(type),
    }));

    const onSave = () => {
      if (!company) return;
      update(company.id, {
        contract,
        businessEntity,
        type,
      }).then((res: ICompany | Error) => {
        if (res instanceof Error) {
          console.error('Error updating company:', res);
          return;
        }
        companyStore.updateCompany({
          ...company,
          contract,
          businessEntity,
          type,
        });
        setIsEditing(false);
      });
    };

    const onCancel = () => {
      setContract(initialContract as IContract);
      setBusinessEntity(initialBusinessEntity || "");
      setType(initialType || []);
      setIsEditing(false);
    };

    const onAgreementNumberChange = (value: string) => {
      if (!company) return;
      setContract({
        no: value,
        issue_date: contract?.issue_date || "",
      });
    };

    const onAgreementDateChange = (value: string) => {
      if (!company) return;
      setContract({
        no: contract?.no || "",
        issue_date: value,
      });
    };

    const onBuisnessEntityChange = (value: string) => {
      if (!company) return;
      setBusinessEntity(value);
    };

    const onCompanyTypeChange = (values: string[]) => {
      if (!company) return;
      setType(values);
    };

    useEffect(() => {
      setContract({ no: no || "", issue_date: issue_date || "" });
    }, [no, issue_date]);

    if (!company) return null;

    return (
      <CardContainer>
        <CardHeader
          title="Details"
          children={
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
          }
        />
        <div className={styles.rows}>
          <CardRow>
            <div className={styles.column__first}>
              <CardLabel label="Agreement:" />
            </div>
            <div
              className={`${styles.column__second} ${styles.agreement__container}`}
            >
              <div className={styles.agreement__input}>
                <Input
                  placeholder="0000/0-00"
                  value={contract.no}
                  onChange={(e) => onAgreementNumberChange(e.target.value)}
                />
              </div>
              <div className={styles.agreement__date}>
                <div className={styles.agreement__dateLabel}>
                  <CardLabel label="Date:" />
                </div>
                <div className={styles.agreement__input}>
                  <Input
                    type="date"
                    placeholder="YYYY-MM-DD"
                    value={formatDateForInput(contract.issue_date)}
                    onChange={(e) => onAgreementDateChange(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </CardRow>
          <CardRow>
            <div className={styles.column__first}>
              <CardLabel label="Buisness entity:" />
            </div>
            <div className={styles.column__second}>
              <Select
                value={businessEntity}
                onChange={(value) => onBuisnessEntityChange(value)}
                options={[{ value: "1", label: businessEntity || "" }]}
              />
            </div>
          </CardRow>
          <CardRow>
            <div className={styles.column__first}>
              <CardLabel label="Company type:" />
            </div>
            <div className={styles.column__second}>
              <MultiSelect
                value={type}
                onChange={(values) => onCompanyTypeChange(values)}
                options={types || []}
              />
            </div>
          </CardRow>
        </div>
      </CardContainer>
    );
  }
);

export default CompanyDetailsEdit;
