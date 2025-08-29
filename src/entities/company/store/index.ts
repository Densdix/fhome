import { makeAutoObservable } from "mobx";
import { ICompany } from "@/entities/company/types";

export class CompanyStore {
  company: ICompany | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  getCompany = () => {
    return this.company;
  }

  setCompany = (company: ICompany) => {
    this.company = company;
  }

  updateCompany = (company: ICompany) => {
    this.company = company;
  }

  deleteCompany = () => {
    this.company = null;
  }
}

export const companyStore = new CompanyStore();