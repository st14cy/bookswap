import type AuthRepository from "../../repository/auth/AuthRepository.tsx";
import type AuthHolder from "../../entity/auth/models/AuthHolder.tsx";

export default class LoginUseCase {
    private  authRepository: AuthRepository;
    private authHolder: AuthHolder;

    public  constructor( authRepository: AuthRepository,authHolder: AuthHolder) {
        this.authHolder = authHolder;
        this.authRepository = authRepository;
    }

    /**
     * @throws {Error} if credentials are not valid or have not passed
     */

    public async loginUser(email: string, password: string): Promise<void> {
        const validatorRes = await this.authRepository.validateCredentials(email, password);
        const authRes = await this.authRepository.login(email, password, validatorRes.validationKey);

        this.authHolder.onSignIn(authRes.authorizationToken);
    }
}
