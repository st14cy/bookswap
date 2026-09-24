export interface AuthUser {
    id: string;
    login: string;
    email: string;
    firstName?: string | null;
    lastName?: string | null;
    isActive: boolean;
    role: number;
}
