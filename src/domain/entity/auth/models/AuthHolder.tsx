import type AuthListener from "./AuthListener.tsx";
import type {AuthUser} from "./AuthUser.ts";
import type AuthorizationResult from "../structures/AuthorizationResult.tsx";

const STORAGE_KEY = 'bookswap.auth';

interface StoredSession {
    accessToken: string;
    refreshToken: string;
    /** Момент истечения access-токена (ms since epoch) */
    accessTokenExpiresAt: number;
    user: AuthUser;
}

/**
 * Хранит состояние авторизации (токены + пользователь),
 * сохраняет его в localStorage и оповещает подписчиков об изменениях.
 */
export default class AuthHolder {
    private authListeners: AuthListener[] = [];
    private session: StoredSession | null;

    public constructor() {
        this.session = AuthHolder.readFromStorage();
    }

    public onSignIn(result: AuthorizationResult): void {
        this.session = {
            accessToken: result.accessToken,
            refreshToken: result.refreshToken,
            accessTokenExpiresAt: Date.now() + result.expiresIn * 1000,
            user: result.user,
        };
        this.persist();
        this.notifyListeners();
    }

    public onSignOut(): void {
        if (!this.session) return;
        this.session = null;
        this.persist();
        this.notifyListeners();
    }

    public isUserAuthorized(): boolean {
        return this.session !== null;
    }

    /**
     * @throws {Error} if user is not authorized
     */
    public getAuthToken(): string {
        if (!this.session) {
            throw new Error('User is not authorized');
        }
        return this.session.accessToken;
    }

    public getRefreshToken(): string | null {
        return this.session?.refreshToken ?? null;
    }

    public getUser(): AuthUser | null {
        return this.session?.user ?? null;
    }

    /** true, если access-токен истёк или истечёт в ближайшие 30 секунд */
    public isAccessTokenExpired(): boolean {
        if (!this.session) return true;
        return Date.now() > this.session.accessTokenExpiresAt - 30_000;
    }

    public addAuthListener(authListener: AuthListener): void {
        this.authListeners.push(authListener);
    }

    public removeAuthListener(authListener: AuthListener): void {
        const index = this.authListeners.indexOf(authListener);
        if (index !== -1) this.authListeners.splice(index, 1);
    }

    public notifyListeners(): void {
        this.authListeners.forEach((listener) => listener.onAuthChanged());
    }

    private persist(): void {
        try {
            if (this.session) {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(this.session));
            } else {
                localStorage.removeItem(STORAGE_KEY);
            }
        } catch {
            // localStorage недоступен (приватный режим и т.п.) — работаем только в памяти
        }
    }

    private static readFromStorage(): StoredSession | null {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return null;
            const parsed = JSON.parse(raw) as StoredSession;
            if (!parsed.accessToken || !parsed.refreshToken || !parsed.user) return null;
            return parsed;
        } catch {
            return null;
        }
    }
}
