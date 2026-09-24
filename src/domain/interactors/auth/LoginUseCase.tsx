import type AuthRepository from "../../repository/auth/AuthRepository.tsx";
import type AuthHolder from "../../entity/auth/models/AuthHolder.tsx";

export default class LoginUseCase {
    private authRepository: AuthRepository;
    private authHolder: AuthHolder;

    public constructor(authRepository: AuthRepository, authHolder: AuthHolder) {
        this.authHolder = authHolder;
        this.authRepository = authRepository;
    }

    public async loginUser(loginOrEmail: string, password: string): Promise<void> {
        const result = await this.authRepository.login(loginOrEmail.trim(), password);
        this.authHolder.onSignIn(result);
    }
}
