import type AuthHolder from '../../domain/entity/auth/models/AuthHolder.tsx';
import type AuthRepository from '../../domain/repository/auth/AuthRepository.tsx';

/**
 * Обёртка над fetch, которая:
 *  - добавляет заголовок Authorization: Bearer <accessToken>, если пользователь вошёл;
 *  - заранее обновляет истёкший access-токен через refresh-токен;
 *  - при ответе 401 один раз пробует обновить токен и повторить запрос;
 *  - если обновить не удалось — разлогинивает пользователя.
 */
export default class AuthorizedHttpClient {
    private refreshPromise: Promise<boolean> | null = null;
    private readonly authHolder: AuthHolder;
    private readonly authRepository: AuthRepository;

    public constructor(authHolder: AuthHolder, authRepository: AuthRepository) {
        this.authHolder = authHolder;
        this.authRepository = authRepository;
    }

    public async fetch(input: string, init: RequestInit = {}): Promise<Response> {
        if (this.authHolder.isUserAuthorized() && this.authHolder.isAccessTokenExpired()) {
            await this.refreshTokens();
        }

        let response = await fetch(input, this.withAuthHeader(init));

        if (response.status === 401 && this.authHolder.isUserAuthorized()) {
            const refreshed = await this.refreshTokens();
            if (refreshed) {
                response = await fetch(input, this.withAuthHeader(init));
            }
        }
        return response;
    }

    private withAuthHeader(init: RequestInit): RequestInit {
        const headers = new Headers(init.headers);
        if (this.authHolder.isUserAuthorized()) {
            headers.set('Authorization', `Bearer ${this.authHolder.getAuthToken()}`);
        }
        return {...init, headers};
    }

    /** Параллельные запросы используют одно и то же обновление токена */
    private refreshTokens(): Promise<boolean> {
        if (!this.refreshPromise) {
            this.refreshPromise = this.doRefresh().finally(() => {
                this.refreshPromise = null;
            });
        }
        return this.refreshPromise;
    }

    private async doRefresh(): Promise<boolean> {
        const refreshToken = this.authHolder.getRefreshToken();
        if (!refreshToken) {
            this.authHolder.onSignOut();
            return false;
        }
        try {
            const result = await this.authRepository.refresh(refreshToken);
            this.authHolder.onSignIn(result);
            return true;
        } catch {
            this.authHolder.onSignOut();
            return false;
        }
    }
}
