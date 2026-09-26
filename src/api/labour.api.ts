import { apiDelete, apiGet } from '../api/client';
import type { ServiceCategory } from '../pages/Admin/admin.types';

export const labourApi = {
    getServices: () => apiGet<ServiceCategory[]>('/admin/services'),
    getEarnings: () => apiGet('/labour/earnings'),
    deleteAccount: () => apiDelete<string>('/labour/delete-account'),
    getTaskHistory: () => apiGet('/labour/history'),
};