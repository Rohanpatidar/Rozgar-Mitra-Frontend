import { apiDelete, apiGet, apiPost, apiPut } from '../api/client';
import type { ServiceCategory } from '../pages/Admin/admin.types';

export interface ProfileResponse {
    id: string;
    name: string;
    username: string;
    email: string;
    phone_number: string;
    dob?: string;
    role?: string;
    address?: { apartmentNumber?: string; buildingName?: string; colony?: string; city?: string; state?: string; pincode?: string; country?: string };
}

export interface CustomerBooking {
    id: string | number;
    serviceId?: number;
    serviceName?: string;
    name?: string;
    description?: string;
    pricePerHour?: number;
    price?: number;
    status?: string;
    addressText?: string;
    address?: string;
    labourName?: string;
    customerUsername?: string;
    customerPhone?: string;
    labourUsername?: string;
    labourPhone?: string;
    createdAt?: string;
    latitude?: number;
    longitude?: number;
    labourLatitude?: number;
    labourLongitude?: number;
    startOtp?: string;
    completionOtp?: string;
    startOtpGeneratedAt?: string;
    startOtpVerifiedAt?: string;
    completionOtpGeneratedAt?: string;
    completionOtpVerifiedAt?: string;
    startedAt?: string;
    completedAt?: string;
    durationMinutes?: number;
    finalAmount?: number;
    paymentStatus?: string;
    paidAt?: string;
}

export interface PagedResponse<T> {
    content: T[];
    number: number;
    totalPages: number;
    last: boolean;
}

export const customerApi = {
    getServices: () => apiGet<ServiceCategory[]>('/admin/services'),
    getBookings: (page = 0, size = 50) => apiGet<CustomerBooking[] | PagedResponse<CustomerBooking>>('/booking/customer/bookings', { page, size }),


    deleteAccount: () => apiDelete<string>('/customer/delete-account'),

    getProfile: () => apiGet<ProfileResponse>('/customer/profile'),
    requestService: (serviceId: number) => apiPost('/customer/request', { serviceId }),
    updateProfile: (data: unknown) => apiPut<ProfileResponse>('/customer/profile', data),
    changePassword: (data: { currentPassword: string; newPassword: string }) => apiPut<string, { currentPassword: string; newPassword: string }>('/customer/change-password', data),
};