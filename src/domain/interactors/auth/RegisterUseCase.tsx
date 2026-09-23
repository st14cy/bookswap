import type RegisterRepository from '../../repository/auth/RegisterRepository.tsx';
import type {RegisterPayload} from '../../repository/auth/RegisterPayload.tsx';
import type AuthHolder from '../../entity/auth/models/AuthHolder.tsx';

export default class RegisterUseCase {
    private registerRepository: RegisterRepository;
    private authHolder: AuthHolder;

    public constructor(registerRepository: RegisterRepository, authHolder: AuthHolder) {
        this.registerRepository = registerRepository;
        this.authHolder = authHolder;
    }

    /**
     * Регистрирует пользователя и сразу авторизует его
     * @throws {Error} if registration has not passed
     */
    public async registerUser(payload: RegisterPayload): Promise<void> {
        const result = await this.registerRepository.register({
            ...payload,
            login: payload.login.trim(),
            email: payload.email.trim(),
            firstName: payload.firstName?.trim() || undefined,
        });
        this.authHolder.onSignIn(result);
    }
}
