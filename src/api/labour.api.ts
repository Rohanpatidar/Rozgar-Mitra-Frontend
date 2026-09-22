import { apiGet } from '../api/client';
import type { ServiceCategory } from '../pages/Admin/admin.types';

export const labourApi = {
    getServices: () => apiGet<ServiceCategory[]>('/admin/services'),
    getEarnings: () => apiGet('/labour/earnings'),
    getTaskHistory: () => apiGet('/labour/history'),
};