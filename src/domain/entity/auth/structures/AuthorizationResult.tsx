import type {AuthUser} from '../models/AuthUser.ts';

/** Результат успешного входа / регистрации / обновления токена */
export default interface AuthorizationResult {
    accessToken: string;
    refreshToken: string;
    /** Время жизни access-токена в секундах */
    expiresIn: number;
    user: AuthUser;
}
