/** Данные текущего пользователя (соответствует UserInfoDto на бэкенде) */
export interface AuthUser {
    id: string;
    login: string;
    email: string;
    firstName?: string | null;
    lastName?: string | null;
    isActive: boolean;
    /** 0 — User, 1 — Admin */
    role: number;
}
