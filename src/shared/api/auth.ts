import { $host } from './requestSetup.ts';

export const auth = async (username: string): Promise<boolean> => {
    try {
        const response = await $host.get(`/auth?user=${username}`);

        if (response.status === 200) {
            localStorage.setItem('token', response.headers.authorization);
            return true;
        }

        return false;
    } catch (error) {
        console.error('Authentication error:', error);
        return false;
    }
};
