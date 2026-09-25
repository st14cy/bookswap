import {useEffect, useReducer} from 'react';
import type NotificationsViewModel from '../view-model/notification/NotificationsViewModel';
import type BaseView from '../view/BaseView';

export default function useNotificationsViewModel<T extends NotificationsViewModel>(notificationsViewModel: T): T {
    const [, forceUpdate] = useReducer((x: number) => x + 1, 0);

    useEffect(() => {
        const view: BaseView = {onViewModelChanged: () => forceUpdate()};
        notificationsViewModel.attachView(view);
        return () => notificationsViewModel.detachView(view);
    }, [notificationsViewModel]);

    return notificationsViewModel;
}
