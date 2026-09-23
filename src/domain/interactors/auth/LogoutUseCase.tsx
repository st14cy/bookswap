import type AuthRepository from '../../repository/auth/AuthRepository.tsx';
import type AuthHolder from '../../entity/auth/models/AuthHolder.tsx';

export default class LogoutUseCase {
    private authRepository: AuthRepository;
    private authHolder: AuthHolder;

    public constructor(authRepository: AuthRepository, authHolder: AuthHolder) {
        this.authRepository = authRepository;
        this.authHolder = authHolder;
    }

    /** Выход никогда не падает: локальная сессия очищается в любом случае */
    public async logoutUser(): Promise<void> {
        if (!this.authHolder.isUserAuthorized()) return;
        try {
            await this.authRepository.logout(this.authHolder.getAuthToken());
        } catch {
            // сервер недоступен или токен истёк — всё равно выходим локально
        } finally {
            this.authHolder.onSignOut();
        }
    }
}
