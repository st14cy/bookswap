import type BaseViewModel from '../BaseViewModel';
import type BaseView from '../../view/BaseView';

export default interface AuthViewModel extends BaseViewModel {
    detachView(baseView?: BaseView): void;

    isAuthorized: boolean;
    currentUserName: string;

    isAuthModalOpen: boolean;
    isRegisterMode: boolean;

    loginQuery: string;
    emailQuery: string;
    nameQuery: string;
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
