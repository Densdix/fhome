import { $authHost } from '@/shared/api/requestSetup';
import { IContact } from './types';

export const getContact = async (id: number): Promise<IContact> => {
    const { data } = await $authHost.get(`/contacts/${id}`);
    return data;
};

export const updateContact = async (id: number, body: Partial<IContact>): Promise<IContact> => {
    const { data } = await $authHost.patch(`/contacts/${id}`, body);
    return data;
};

