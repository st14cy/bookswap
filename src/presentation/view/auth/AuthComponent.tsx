import React from 'react';
import type AuthViewModel from '../../view-model/auth/AuthViewModel';
import Input from '../../../shared/ui/Input.tsx';
import Button from '../../../shared/ui/Button.tsx';
import useAuthViewModel from '../../hooks/useAuthViewModel.ts';

interface Props {
    authViewModel: AuthViewModel;
}

const AuthComponent: React.FC<Props> = ({authViewModel}) => {
    const vm = useAuthViewModel(authViewModel);
    const isRegisterMode = vm.isRegisterMode;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        void vm.onSubmit();
    };

    return (
        <form className="flex flex-col gap-3" onSubmit={handleSubmit} noValidate>
            <h2 className="text-24 font-bold mb-2">
                {isRegisterMode ? 'Регистрация' : 'Вход'}
            </h2>

            <Input style="base"
                   name="login"
                   id="auth-login"
                   type="text"
                   label={isRegisterMode ? 'Логин' : 'Логин или email'}
                   placeholder={isRegisterMode ? 'Логин' : 'Логин или email'}
                   autoComplete="username"
                   value={vm.loginQuery}
                   disabled={vm.isLoading}
                   onChange={(e) => vm.onLoginQueryChanged(e.target.value)}
            />

            {isRegisterMode && (
                <>
                    <Input style="base"
                           name="email"
                           id="auth-email"
                           type="email"
                           label="Email"
                           placeholder="user@email.com"
                           autoComplete="email"
                           value={vm.emailQuery}
                           disabled={vm.isLoading}
                           onChange={(e) => vm.onEmailQueryChanged(e.target.value)}
                    />
                    <Input style="base"
                           name="firstName"
                           id="auth-name"
                           type="text"
                           label="Имя"
                           placeholder="Имя (необязательно)"
                           autoComplete="given-name"
                           value={vm.nameQuery}
                           disabled={vm.isLoading}
                           onChange={(e) => vm.onNameQueryChanged(e.target.value)}
                    />
                </>
            )}

            <Input style="base"
                   name="password"
                   id="auth-password"
                   type="password"
                   label="Пароль"
                   placeholder="Пароль"
                   autoComplete={isRegisterMode ? 'new-password' : 'current-password'}
                   value={vm.passwordQuery}
                   disabled={vm.isLoading}
                   onChange={(e) => vm.onPasswordQueryChanged(e.target.value)}
            />

            {isRegisterMode && (
                <Input style="base"
                       name="confirmPassword"
                       id="auth-confirm-password"
                       type="password"
                       label="Повторите пароль"
                       placeholder="Повторите пароль"
                       autoComplete="new-password"
                       value={vm.confirmPasswordQuery}
                       disabled={vm.isLoading}
                       onChange={(e) => vm.onConfirmPasswordQueryChanged(e.target.value)}
                />
            )}

            {vm.isShowError && (
                <div role="alert" className="text-accent whitespace-pre-line">
                    {vm.errorMessage}
                </div>
            )}

            <Button type="submit" variant="accent" disabled={vm.isLoading}>
                {vm.isLoading
                    ? 'Подождите…'
                    : isRegisterMode ? 'Зарегистрироваться' : 'Войти'}
            </Button>

            <button
                type="button"
                className="text-blue underline-offset-2 hover:underline"
                disabled={vm.isLoading}
                onClick={() => vm.onClickSwitchMode()}
            >
                {isRegisterMode ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Зарегистрироваться'}
            </button>
        </form>
    );
};

export default AuthComponent;
