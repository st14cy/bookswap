import type AuthorizationResult from '../../entity/auth/structures/AuthorizationResult';
import type RegisterRepository from './RegisterRepository.tsx';

export default interface AuthRepository extends RegisterRepository {
    login(loginOrEmail: string, password: string): Promise<AuthorizationResult>;

    refresh(refreshToken: string): Promise<AuthorizationResult>;

    logout(accessToken: string): Promise<void>;
}
