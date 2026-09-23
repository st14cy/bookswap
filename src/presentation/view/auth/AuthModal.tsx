import React from 'react';
import AuthComponent from './AuthComponent';
import type AuthViewModel from '../../view-model/auth/AuthViewModel';
import Modal from "../../../shared/ui/modal/Modal.tsx";
import useAuthViewModel from '../../hooks/useAuthViewModel.ts';

interface Props {
    authViewModel: AuthViewModel;
}

/** Модалка входа/регистрации. Открывается через authViewModel.openAuthModal() */
const AuthModal: React.FC<Props> = ({authViewModel}) => {
    const vm = useAuthViewModel(authViewModel);

    return (
        <Modal isOpen={vm.isAuthModalOpen} onClose={vm.closeAuthModal}>
            <AuthComponent authViewModel={vm} />
        </Modal>
    );
};

export default AuthModal;
