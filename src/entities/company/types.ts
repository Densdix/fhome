export interface IContract {
    no: string;
    issue_date: string;
 };
 
 export interface IPhoto {
    name: string;
    filepath: string;
    thumbpath: string;
    createdAt: string;
 };
 
 export interface ICompany {
    id: number;
    contactId: string;
    name: string;
    shortName: string;
    businessEntity: string;
    contract: IContract;
    type: string[];
    status: string;
    photos: IPhoto[];
    createdAt: string;
    updatedAt: string;
 };

 export interface IContact {
    id: number;
    lastname: string;
    firstname: string;
    phone: string;
    email: string;
    createdAt: string;
    updatedAt: string;
}