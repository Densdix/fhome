import { $authHost } from "@/shared/api/requestSetup";
import { IContact } from "./types";

export const getContact = async (id: number): Promise<IContact> => {
  try {
    const response = await $authHost.get(`/contacts/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching contact:", error);
    throw new Error("Failed to fetch contact");
  }
};

export const updateContact = async (
  id: number,
  contact: Partial<IContact>
): Promise<IContact> => {
  try {
    const response = await $authHost.patch(`/contacts/${id}`, contact);
    return response.data;
  } catch (error) {
    console.error("Error updating contact:", error);
    throw new Error("Failed to update contact");
  }
};
