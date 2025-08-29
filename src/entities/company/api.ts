import { $authHost } from '@/shared/api/requestSetup';
import { ICompany, IPhoto } from './types';

export const create = async (body: ICompany): Promise<ICompany | Error> => {
    try {
        const { data } =  await $authHost.post('/companies', body);
        return data;
    } catch (error) {
        console.error('Error creating company:', error);
        return new Error('Failed to create company');
    }
};

export const get = async (id: number): Promise<ICompany | Error> => {
    try {
        const { data } =  await $authHost.get(`/companies/${id}`);
        return data;
    } catch (error) {
        console.error('Error getting company:', error);
        return new Error('Failed to get company');
    }
};

export const update = async (id: number, body: Partial<ICompany>): Promise<ICompany | Error> => {
    try {
        const { data } =  await $authHost.patch(`/companies/${id}`, body);
        return data;
    } catch (error) {
        console.error('Error updating company:', error);
        return new Error('Failed to update company');
    }
};

export const remove = async (id: number): Promise<boolean> => {
    try {
        const res =  await $authHost.delete(`/companies/${id}`);
        return res.status === 200;
    } catch (error) {
        console.error('Error removing company:', error);
        return false;
    }
};

export const addImage = async (id: number, image: File): Promise<IPhoto | Error> => {
    try {
        const formData = new FormData();
        formData.append('file', image);
        const { data } = await $authHost.post(`/companies/${id}/image`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return data;
    } catch (error) {
        console.error('Error adding image:', error);
        return new Error('Failed to add image');
    }
};

export const removeImage = async (id: number, imageName: string): Promise<boolean> => {
    try {
        const res =  await $authHost.delete(`/companies/${id}/image/${imageName}`);
        return res.status === 200;
    } catch (error) {
        console.error('Error removing image:', error);
        return false;
    }
};
