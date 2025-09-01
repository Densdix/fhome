import { $authHost } from "@/shared/api/requestSetup";
import { ICompany, IPhoto } from "./types";

export const getOrganizations = async (): Promise<ICompany[]> => {
  try {
    const organizations: ICompany[] = [
      {
        id: 12,
        contactId: 16,
        name: "Eternal Rest Funeral Home",
        shortName: "ERFH",
        businessEntity: "Partnership",
        contract: {
          no: "1624/2-24",
          issue_date: "2024-03-12T00:00:00Z",
        },
        type: ["funeral_home", "logistics_services", "burial_care_contractor"],
        status: "active",
        photos: [],
        createdAt: "2020-11-21T08:03:00Z",
        updatedAt: "2020-11-23T09:30:00Z",
      },
      {
        id: 13,
        contactId: 17,
        name: "Peaceful Gardens Memorial",
        shortName: "PGM",
        businessEntity: "Corporation",
        contract: {
          no: "1625/3-24",
          issue_date: "2024-03-15T00:00:00Z",
        },
        type: ["funeral_home", "burial_care_contractor"],
        status: "active",
        photos: [],
        createdAt: "2020-11-22T08:03:00Z",
        updatedAt: "2020-11-24T09:30:00Z",
      },
      {
        id: 14,
        contactId: 18,
        name: "Serenity Funeral Services",
        shortName: "SFS",
        businessEntity: "LLC",
        contract: {
          no: "1626/4-24",
          issue_date: "2024-03-18T00:00:00Z",
        },
        type: ["funeral_home", "logistics_services"],
        status: "active",
        photos: [],
        createdAt: "2020-11-23T08:03:00Z",
        updatedAt: "2020-11-25T09:30:00Z",
      },
    ];

    await new Promise((resolve) => setTimeout(resolve, 500));

    return organizations;
  } catch (error) {
    console.error("Error fetching organizations:", error);
    throw new Error("Failed to fetch organizations");
  }
};

export const get = async (id: number): Promise<ICompany> => {
  try {
    const response = await $authHost.get(`/companies/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching company:", error);
    throw new Error("Failed to fetch company");
  }
};

export const create = async (company: Partial<ICompany>): Promise<ICompany> => {
  try {
    const response = await $authHost.post("/companies", company);
    return response.data;
  } catch (error) {
    console.error("Error creating company:", error);
    throw new Error("Failed to create company");
  }
};

export const update = async (
  id: number,
  company: Partial<ICompany>
): Promise<ICompany> => {
  try {
    const response = await $authHost.patch(`/companies/${id}`, company);
    return response.data;
  } catch (error) {
    console.error("Error updating company:", error);
    throw new Error("Failed to update company");
  }
};

export const remove = async (id: number): Promise<boolean> => {
  try {
    await $authHost.delete(`/companies/${id}`);
    return true;
  } catch (error) {
    console.error("Error deleting company:", error);
    throw new Error("Failed to delete company");
  }
};

export const addImage = async (id: number, file: File): Promise<IPhoto> => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await $authHost.post(`/companies/${id}/image`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding image:", error);
    throw new Error("Failed to add image");
  }
};

export const removeImage = async (
  id: number,
  imageName: string
): Promise<boolean> => {
  try {
    await $authHost.delete(`/companies/${id}/image/${imageName}`);
    return true;
  } catch (error) {
    console.error("Error removing image:", error);
    throw new Error("Failed to remove image");
  }
};
