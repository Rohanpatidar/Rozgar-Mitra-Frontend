import { apiPost } from './client';

export interface LoginPayload {
    username: string;
    password: string;
}

export interface AddressPayload {
    apartmentNumber: string;
    buildingName: string;
    colony: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
}

export interface SignupPayload {
    name: string;
    username: string;
    email: string;
    dob: string;
    phone_number: string;
    address: AddressPayload;
    password: string;
    role: string;
}
export interface AuthResponse {
    data?: {
        token?: string;
        role?: string;
        id?: string;
        username?: string;
    };
    message?: string;
    status?: number;
}
export const extractAuthToken = (response: AuthResponse): string | undefined =>
    response.data?.token;

export const extractUserRole = (response: AuthResponse): string | undefined =>
    response.data?.role;

export const loginRequest = (payload: LoginPayload) =>
    apiPost<AuthResponse, LoginPayload>('/auth/login', payload);

export const signupRequest = (payload: SignupPayload) =>
    apiPost<AuthResponse, SignupPayload>('/auth/signup', payload);


