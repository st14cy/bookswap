
import AuthHolder from '../../entity/auth/models/AuthHolder';
import type AuthRepository from "../../repository/auth/AuthRepository.tsx";


export  default class LoginUseCase {
    private  authRepository: AuthRepository;
    private authHolder: AuthHolder;

    public constructor(authRepository: AuthRepository, authHolder: AuthHolder) {
        this.authRepository = authRepository;
        this.authHolder = authHolder;
    }

    /**
     * @throws {Error} if credentials are not valid or have not passed
     */

    public async login(email:string, password:string): Promise<void> {
        const  validaetResult = await this.authRepository.validateCredentials(email, password);
        const authResult= await  this.authRepository.login(email, password, validaetResult.validationKey);

        this.authHolder.onSignIn(authResult.authorizationToken);
    }
}