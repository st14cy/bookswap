import type AuthRepository from '../../domain/repository/auth/AuthRepository';
import type {RegisterPayload} from '../../domain/repository/auth/RegisterPayload.tsx';
import type AuthorizationResult from '../../domain/entity/auth/structures/AuthorizationResult';
import readErrorMessage from '../http/readErrorMessage.ts';

interface AuthResponseDto {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    user: {
        id: string;
        login: string;
        email: string;
        firstName?: string | null;
        lastName?: string | null;
        isActive: boolean;
        role: number;
    };
}

export default class AuthApi implements AuthRepository {
    private readonly baseUrl = `${import.meta.env.VITE_API_URL ?? ''}/api/Auth`;

    public async login(loginOrEmail: string, password: string): Promise<AuthorizationResult> {
        const data = await this.post<AuthResponseDto>('/login', {
            login: loginOrEmail,
            password,
        });
        return this.mapToResult(data);
    }

    public async register(payload: RegisterPayload): Promise<AuthorizationResult> {
        const data = await this.post<AuthResponseDto>('/register', {
            login: payload.login,
            email: payload.email,
            password: payload.password,
            confirmPassword: payload.confirmPassword,
            firstName: payload.firstName ?? null,
        });
        return this.mapToResult(data);
    }

    public async refresh(refreshToken: string): Promise<AuthorizationResult> {
        const data = await this.post<AuthResponseDto>('/refresh', {refreshToken});
        return this.mapToResult(data);
    }

    public async logout(accessToken: string): Promise<void> {
        const response = await fetch(`${this.baseUrl}/logout`, {
            method: 'POST',
            headers: {Authorization: `Bearer ${accessToken}`},
        });
        if (!response.ok) {
            throw new Error(await readErrorMessage(response));
        }
    }

    private async post<T>(path: string, body: unknown): Promise<T> {
        let response: Response;
        try {
            response = await fetch(`${this.baseUrl}${path}`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body),
            });
        } catch {
            throw new Error('Сервер недоступен. Проверьте, что API запущен');
        }

        if (!response.ok) {
            throw new Error(await readErrorMessage(response));
        }
        return (await response.json()) as T;
    }

    private mapToResult(data: AuthResponseDto): AuthorizationResult {
        return {
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            expiresIn: data.expiresIn,
            user: {
                id: data.user.id,
                login: data.user.login,
                email: data.user.email,
                firstName: data.user.firstName,
                lastName: data.user.lastName,
                isActive: data.user.isActive,
                role: data.user.role,
            },
        };
    }
}
