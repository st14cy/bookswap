import type AuthViewModel from './AuthViewModel';
import type BaseView from '../../view/BaseView';
import type LoginUseCase from '../../../domain/interactors/auth/LoginUseCase';
import type RegisterUseCase from '../../../domain/interactors/auth/RegisterUseCase';
import type LogoutUseCase from '../../../domain/interactors/auth/LogoutUseCase';
import type AuthHolder from '../../../domain/entity/auth/models/AuthHolder';
import type AuthListener from '../../../domain/entity/auth/models/AuthListener';
import FormValidator from '../../util/FormValidator';

export default class AuthViewModelImpl implements AuthViewModel, AuthListener {
    public isAuthorized = false;
    public currentUserName = '';

    public isAuthModalOpen = false;
    public isRegisterMode = false;

    public loginQuery = '';
    public emailQuery = '';
    public nameQuery = '';
    public passwordQuery = '';
    public confirmPasswordQuery = '';

    public isLoading = false;
    public isShowError = false;
    public errorMessage = '';

    private views = new Set<BaseView>();
    private readonly loginUseCase: LoginUseCase;
    private readonly registerUseCase: RegisterUseCase;
    private readonly logoutUseCase: LogoutUseCase;
    private readonly authHolder: AuthHolder;

    public constructor(
        loginUseCase: LoginUseCase,
        registerUseCase: RegisterUseCase,
        logoutUseCase: LogoutUseCase,
        authHolder: AuthHolder,
    ) {
        this.loginUseCase = loginUseCase;
        this.registerUseCase = registerUseCase;
        this.logoutUseCase = logoutUseCase;
        this.authHolder = authHolder;

        this.authHolder.addAuthListener(this);
        this.syncWithAuthHolder();
    }

    public attachView = (baseView: BaseView): void => {
        this.views.add(baseView);
    };

    public detachView = (baseView?: BaseView): void => {
        if (baseView) this.views.delete(baseView);
        else this.views.clear();
    };

    public onAuthChanged = (): void => {
        this.syncWithAuthHolder();
        this.notifyViewAboutChanges();
    };

    public openAuthModal = (registerMode = false): void => {
        this.resetForm();
        this.isRegisterMode = registerMode;
        this.isAuthModalOpen = true;
        this.notifyViewAboutChanges();
    };

    public closeAuthModal = (): void => {
        this.isAuthModalOpen = false;
        this.resetForm();
        this.notifyViewAboutChanges();
    };

    public onClickSwitchMode = (): void => {
        this.isRegisterMode = !this.isRegisterMode;
        this.passwordQuery = '';
        this.confirmPasswordQuery = '';
        this.clearError();
        this.notifyViewAboutChanges();
    };

    public onLoginQueryChanged = (value: string): void => {
        this.loginQuery = value;
        this.notifyViewAboutChanges();
    };

    public onEmailQueryChanged = (value: string): void => {
        this.emailQuery = value;
        this.notifyViewAboutChanges();
    };

    public onNameQueryChanged = (value: string): void => {
        this.nameQuery = value;
        this.notifyViewAboutChanges();
    };

    public onPasswordQueryChanged = (value: string): void => {
        this.passwordQuery = value;
        this.notifyViewAboutChanges();
    };

    public onConfirmPasswordQueryChanged = (value: string): void => {
        this.confirmPasswordQuery = value;
        this.notifyViewAboutChanges();
    };

    public onSubmit = (): Promise<void> =>
        this.isRegisterMode ? this.onClickRegister() : this.onClickSignIn();

    public onClickSignIn = async (): Promise<void> => {
        if (this.isLoading) return;
        if (!this.validateLoginForm()) {
            this.notifyViewAboutChanges();
            return;
        }

        await this.runWithLoading(
            () => this.loginUseCase.loginUser(this.loginQuery, this.passwordQuery),
            'Не удалось войти',
        );
    };

    public onClickRegister = async (): Promise<void> => {
        if (this.isLoading) return;
        if (!this.validateRegisterForm()) {
            this.notifyViewAboutChanges();
            return;
        }

        await this.runWithLoading(
            () => this.registerUseCase.registerUser({
                login: this.loginQuery,
                email: this.emailQuery,
                password: this.passwordQuery,
                confirmPassword: this.confirmPasswordQuery,
                firstName: this.nameQuery,
            }),
            'Не удалось зарегистрироваться',
        );
    };

    public onClickSignOut = async (): Promise<void> => {
        await this.logoutUseCase.logoutUser();
    };

    private runWithLoading = async (action: () => Promise<void>, fallbackError: string): Promise<void> => {
        this.isLoading = true;
        this.clearError();
        this.notifyViewAboutChanges();

        try {
            await action();
            this.isLoading = false;
            this.closeAuthModal();
        } catch (e) {
            this.isLoading = false;
            this.setError(e instanceof Error && e.message ? e.message : fallbackError);
            this.notifyViewAboutChanges();
        }
    };

    private syncWithAuthHolder = (): void => {
        const user = this.authHolder.getUser();
        this.isAuthorized = this.authHolder.isUserAuthorized();
        this.currentUserName = user ? (user.firstName || user.login) : '';
    };

    private validateLoginForm = (): boolean => {
        if (!this.loginQuery.trim()) {
            return this.setError('Введите логин или email');
        }
        if (!this.passwordQuery) {
            return this.setError('Введите пароль');
        }
        return this.clearError();
    };

    private validateRegisterForm = (): boolean => {
        if (!this.loginQuery.trim()) {
            return this.setError('Введите логин');
        }
        if (this.loginQuery.trim().length > 100) {
            return this.setError('Логин должен быть не длиннее 100 символов');
        }
        if (!this.emailQuery.trim()) {
            return this.setError('Введите email');
        }
        if (!FormValidator.isValidEmail(this.emailQuery.trim())) {
            return this.setError('Некорректный формат email');
        }
        if (!this.passwordQuery) {
            return this.setError('Введите пароль');
        }
        if (this.passwordQuery.length < 6) {
            return this.setError('Пароль должен содержать минимум 6 символов');
        }
        if (this.passwordQuery !== this.confirmPasswordQuery) {
            return this.setError('Пароли не совпадают');
        }
        return this.clearError();
    };

    private setError = (message: string): boolean => {
        this.isShowError = true;
        this.errorMessage = message;
        return false;
    };

    private clearError = (): boolean => {
        this.isShowError = false;
        this.errorMessage = '';
        return true;
    };

    private resetForm = (): void => {
        this.loginQuery = '';
        this.emailQuery = '';
        this.nameQuery = '';
        this.passwordQuery = '';
        this.confirmPasswordQuery = '';
        this.isRegisterMode = false;
        this.isLoading = false;
        this.clearError();
    };

    private notifyViewAboutChanges = (): void => {
        this.views.forEach((view) => view.onViewModelChanged());
    };
}
