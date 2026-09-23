import type AuthRepository from '../../domain/repository/auth/AuthRepository';
import type {RegisterPayload} from '../../domain/repository/auth/RegisterPayload.tsx';
import type AuthorizationResult from '../../domain/entity/auth/structures/AuthorizationResult';

/**
 * Фейковая реализация для работы без бэкенда.
 * Тестовый аккаунт: логин "user" (или user@email.com), пароль "password".
 * Чтобы включить — подставьте new AuthFakeApi() вместо new AuthApi() в di.ts.
 */
export default class AuthFakeApi implements AuthRepository {
    public async login(loginOrEmail: string, password: string): Promise<AuthorizationResult> {
        const isKnownUser = loginOrEmail === 'user' || loginOrEmail === 'user@email.com';
        if (!isKnownUser || password !== 'password') {
            throw new Error('Неверный логин или пароль');
        }
        return this.fakeResult('user', 'user@email.com', 'Тестовый пользователь');
    }

    public async register(payload: RegisterPayload): Promise<AuthorizationResult> {
        if (payload.password !== payload.confirmPassword) {
            throw new Error('Пароли не совпадают');
        }
        return this.fakeResult(payload.login, payload.email, payload.firstName);
    }

    public async refresh(): Promise<AuthorizationResult> {
        return this.fakeResult('user', 'user@email.com', 'Тестовый пользователь');
    }

    public async logout(): Promise<void> {
        // nothing to do
    }

    private fakeResult(login: string, email: string, firstName?: string): AuthorizationResult {
        return {
            accessToken: 'fake-access-token',
            refreshToken: 'fake-refresh-token',
            expiresIn: 60 * 60,
            user: {id: '00000000-0000-0000-0000-000000000001', login, email, firstName, isActive: true, role: 0},
        };
    }
}
