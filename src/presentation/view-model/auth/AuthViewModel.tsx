import type BaseViewModel from '../BaseViewModel';
import type BaseView from '../../view/BaseView';

export default interface AuthViewModel extends BaseViewModel {
    /** Несколько вьюх (шапка, модалка, защищённые страницы) могут слушать одну модель */
    detachView(baseView?: BaseView): void;

    // --- состояние сессии ---
    isAuthorized: boolean;
    currentUserName: string;

    // --- модалка ---
    isAuthModalOpen: boolean;
    isRegisterMode: boolean;

    // --- поля формы ---
    loginQuery: string;          // вход: логин или email; регистрация: логин
    emailQuery: string;          // только регистрация
    nameQuery: string;           // только регистрация (имя продавца, необязательно)
    passwordQuery: string;
    confirmPasswordQuery: string;

    openAuthModal(registerMode?: boolean): void;
    closeAuthModal(): void;
    onClickSwitchMode(): void;

    onLoginQueryChanged(value: string): void;
    onEmailQueryChanged(value: string): void;
    onNameQueryChanged(value: string): void;
    onPasswordQueryChanged(value: string): void;
    onConfirmPasswordQueryChanged(value: string): void;

    onSubmit(): Promise<void>;
    onClickSignIn(): Promise<void>;
    onClickRegister(): Promise<void>;
    onClickSignOut(): Promise<void>;
}
