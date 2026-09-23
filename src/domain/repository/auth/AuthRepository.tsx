import type AuthorizationResult from '../../entity/auth/structures/AuthorizationResult';
import type RegisterRepository from './RegisterRepository.tsx';

export default interface AuthRepository extends RegisterRepository {
    /**
     * Вход по логину или email
     * @throws {Error} if credentials have not passed
     */
    login(loginOrEmail: string, password: string): Promise<AuthorizationResult>;

    /**
     * Получение новой пары токенов по refresh-токену
     * @throws {Error} if refresh token is invalid or expired
     */
    refresh(refreshToken: string): Promise<AuthorizationResult>;

    /**
     * Выход: сервер удаляет refresh-токен пользователя
     */
    logout(accessToken: string): Promise<void>;
}
