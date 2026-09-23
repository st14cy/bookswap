import React from 'react';
import type AuthViewModel from '../../view-model/auth/AuthViewModel';
import useAuthViewModel from '../../hooks/useAuthViewModel.ts';
import Button from '../../../shared/ui/Button.tsx';

interface Props {
    authViewModel: AuthViewModel;
    children: React.ReactNode;
}

/** Показывает содержимое только авторизованным пользователям */
const RequireAuth: React.FC<Props> = ({authViewModel, children}) => {
    const vm = useAuthViewModel(authViewModel);

    if (vm.isAuthorized) return <>{children}</>;

    return (
        <div className="flex flex-col items-center gap-4 py-16 text-center">
            <p className="text-24">Эта страница доступна только после входа</p>
            <div className="flex gap-4">
                <Button variant="accent" onClick={() => vm.openAuthModal(false)}>Войти</Button>
                <Button onClick={() => vm.openAuthModal(true)}>Зарегистрироваться</Button>
            </div>
        </div>
    );
};

export default RequireAuth;
