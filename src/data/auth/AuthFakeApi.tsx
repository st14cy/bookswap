import type AuthRepository from '../../domain/repository/auth/AuthRepository';
import type ValidationResult from '../../domain/entity/auth/structures/ValidationResult';
import type AuthorizationResult from '../../domain/entity/auth/structures/AuthorizationResult';

// Класс, имитирующий доступ к API
export default class AuthFakeApi implements AuthRepository {
    /**
     * @throws {Error} if validation has not passed
     */
    validateCredentials(_email: string, password: string): Promise<ValidationResult> {
        return new Promise((resolve, reject) => {
            // Создаем правило, которое должен был бы поддерживать сервер
            if (password.length < 5) {
                reject(new Error('Password length should be more than 5 characters'));
                return;
            }

            resolve({
                validationKey: 'A34dZ7',
            });
        });
    }

    /**
     * @throws {Error} if credentials have not passed
     */
    login(email: string, password: string, validationKey: string): Promise<AuthorizationResult> {
        return new Promise((resolve, reject) => {
            // Имитируем проверку ключа валидации
            if (validationKey === 'A34dZ7') {
                // Создаем пример подходящего аккаунта с логином user@email.com и паролем password
                if (email === 'user@email.com' && password === 'password') {
                    resolve({
                        authorizationToken: 'Bearer ASKJdsfjdijosd93wiesf93isef',
                    });
                }
            } else {
                reject(new Error('Validation key is not correct. Please try later'));
                return;
            }

            reject(new Error('Email or password is not correct'));
        });
    }
}
