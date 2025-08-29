import { $authHost } from '@/shared/api/requestSetup';
import { ICompany } from './types';

export const create = async (body: ICompany): Promise<ICompany> => {
    const { data } =  await $authHost.post('/companies', body);
    return data;
};

export const get = async (id: number): Promise<ICompany> => {
    const { data } =  await $authHost.get(`/companies/${id}`);
    return data;
};

export const update = async (id: number, body: Partial<ICompany>): Promise<ICompany> => {
    const { data } =  await $authHost.patch(`/companies/${id}`, body);
    return data;
};

export const remove = async (id: number): Promise<boolean> => {
    const res =  await $authHost.delete(`/companies/${id}`);
    return res.status === 200;
};

export const addImage = async (id: number, image: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', image);
    const { data } = await $authHost.post(`/companies/${id}/image`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return data;
};

export const removeImage = async (id: number, imageName: string): Promise<boolean> => {
    const res =  await $authHost.delete(`/companies/${id}/image/${imageName}`);
    return res.status === 200;
};
