import { makeAutoObservable } from "mobx";
import { IContact } from "../types";

export class ContactStore {
  contact: IContact | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  getContact = () => {
    return this.contact;
  }

  setContact = (contact: IContact) => {
    this.contact = contact;
  }

  updateContact = (contact: IContact) => {
    this.contact = contact;
  }
}

export const contactStore = new ContactStore();