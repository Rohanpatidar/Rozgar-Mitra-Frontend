import { STORAGE_KEYS } from './constants';

export const getAuthToken = (): string | null => localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);

export const setAuthToken = (token: string): void => {
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
};

export const clearAuthToken = (): void => {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
};

export const isAuthenticated = (): boolean => Boolean(getAuthToken());

export const getUserRole = (): string | null => localStorage.getItem(STORAGE_KEYS.USER_ROLE);

export const setUserRole = (role: string): void => {
    localStorage.setItem(STORAGE_KEYS.USER_ROLE, role);
};

export const normalizeUserRole = (role: string | null): string | null => {
    if (!role) return null;
    const normalized = role.toUpperCase();
    if (normalized.includes('ADMIN')) return 'ROLE_ADMIN';
    if (normalized.includes('LABOUR')) return 'ROLE_LABOUR';
    if (normalized.includes('CUSTOMER')) return 'ROLE_CUSTOMER';
    return normalized;
};

export const clearUserRole = (): void => {
    localStorage.removeItem(STORAGE_KEYS.USER_ROLE);
};

export const clearSession = (): void => {
    clearAuthToken();
    clearUserRole();
};
