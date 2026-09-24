import type AuthRepository from '../../repository/auth/AuthRepository.tsx';
import type AuthHolder from '../../entity/auth/models/AuthHolder.tsx';

export default class LogoutUseCase {
    private authRepository: AuthRepository;
    private authHolder: AuthHolder;

    public constructor(authRepository: AuthRepository, authHolder: AuthHolder) {
        this.authRepository = authRepository;
        this.authHolder = authHolder;
    }

    public async logoutUser(): Promise<void> {
        if (!this.authHolder.isUserAuthorized()) return;
        try {
            await this.authRepository.logout(this.authHolder.getAuthToken());
        } catch {
        } finally {
            this.authHolder.onSignOut();
        }
    }
}
