import CardContainer from "@/shared/ui/Card/CardContainer";
import CardHeader from "@/shared/ui/Card/CardHeader";
import CardRow from "@/shared/ui/Card/CardRow";
import Input from "@/shared/ui/Input/Input";
import Select from "@/shared/ui/Select/Select";
import MultiSelect from "@/shared/ui/MultiSelect/MultiSelect";
import CardLabel from "@/shared/ui/Card/CardLabel";
import styles from "./CompanyDetails.module.scss";
import Button from "@/shared/ui/Button/Button";
import { companyStore } from "@/entities/company/store";
import { observer } from "mobx-react-lite";
import { formatDateForInput } from "./lib";
import { IContract } from "@/entities/company/types";
import { update } from "@/entities/company/api";
import { useState } from "react";
import { Loader } from "@/shared/ui/Loader/Loader";

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

    const [contract, setContract] = useState<IContract>(
      initialContract as IContract
    );
    const [businessEntity, setBusinessEntity] = useState<string>(
      initialBusinessEntity || ""
    );
    const [type, setType] = useState<string[]>(initialType || []);
    const [isSaving, setIsSaving] = useState(false);

    const onSave = async () => {
      if (!company) return;
      setIsSaving(true);

      try {
        const updatedCompany = await update(company.id, {
          contract,
          businessEntity,
          type,
        });

        companyStore.updateCompany(updatedCompany);
        setIsEditing(false);
      } catch (error) {
        console.error("Error updating company:", error);
      } finally {
        setIsSaving(false);
      }
    };

    const onCancel = () => {
      setContract(initialContract as IContract);
      setBusinessEntity(initialBusinessEntity || "");
      setType(initialType || []);
      setIsEditing(false);
    };

    const onAgreementNumberChange = (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      if (!company) return;
      setContract({
        no: e.target.value,
        issue_date: contract?.issue_date || "",
      });
    };

    const onAgreementDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!company) return;
      setContract({
        no: contract?.no || "",
        issue_date: e.target.value,
      });
    };

    const onBuisnessEntityChange = (value: string) => {
      if (!company) return;
      setBusinessEntity(value);
    };

    const onTypeChange = (selectedTypes: string[]) => {
      if (!company) return;
      setType(selectedTypes);
    };

    const businessEntityOptions = [
      { value: "Partnership", label: "Partnership" },
      { value: "Corporation", label: "Corporation" },
      { value: "LLC", label: "LLC" },
      { value: "Sole Proprietorship", label: "Sole Proprietorship" },
    ];

    const typeOptions = [
      { value: "funeral_home", label: "Funeral Home" },
      { value: "logistics_services", label: "Logistics Services" },
      { value: "burial_care_contractor", label: "Burial Care Contractor" },
      { value: "cremation_services", label: "Cremation Services" },
      { value: "memorial_services", label: "Memorial Services" },
    ];

    if (!company) return null;

    return (
      <CardContainer>
        <CardHeader
          title="Details"
          children={
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
                  value={contract?.no || ""}
                  onChange={onAgreementNumberChange}
                  placeholder="Enter agreement number"
                />
              </div>
              <div className={styles.agreement__date}>
                <div className={styles.agreement__dateLabel}>D</div>
                <Input
                  type="date"
                  value={
                    contract?.issue_date
                      ? formatDateForInput(contract.issue_date)
                      : ""
                  }
                  onChange={onAgreementDateChange}
                />
              </div>
            </div>
          </CardRow>
          <CardRow>
            <div className={styles.column__first}>
              <CardLabel label="Business entity:" />
            </div>
            <div className={styles.column__second}>
              <Select
                value={businessEntity}
                onChange={onBuisnessEntityChange}
                options={businessEntityOptions}
                placeholder="Select business entity"
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
                onChange={onTypeChange}
                options={typeOptions}
                placeholder="Select company types"
              />
            </div>
          </CardRow>
        </div>
      </CardContainer>
    );
  }
);

export default CompanyDetailsEdit;
