export interface RegisterPayload {
    login: string;
    email: string;
    password: string;
    confirmPassword: string;
    firstName?: string;
}
