import type {AuthUser} from '../models/AuthUser.ts';

export default interface AuthorizationResult {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    user: AuthUser;
}
