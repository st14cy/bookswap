import ValidationResult from '../../entity/auth/structures/ValidationResult'
import AuthorizationResult from '../../entity/auth/structures/AuthorizationResult'

export default interface AuthRepository{
    /**
     * @throws {Error} if validation has not passed
     */
    validateCrendentials(email:string,password:string) : Promise<ValidationResult>;
    /**
     * @throws {Error} if credentials have not passed
     */
    login(email:string, password:string) : Promise<AuthorizationResult>;

}