import {useEffect, useReducer} from 'react';
import type AuthViewModel from '../view-model/auth/AuthViewModel';
import type BaseView from '../view/BaseView';

export default function useAuthViewModel<T extends AuthViewModel>(authViewModel: T): T {
    const [, forceUpdate] = useReducer((x: number) => x + 1, 0);

    useEffect(() => {
        const view: BaseView = {onViewModelChanged: () => forceUpdate()};
        authViewModel.attachView(view);
        return () => authViewModel.detachView(view);
    }, [authViewModel]);

    return authViewModel;
}
