import {useEffect, useReducer} from 'react';
import type CartViewModel from '../view-model/cart/CartViewModel';
import type BaseView from '../view/BaseView';

export default function useCartViewModel<T extends CartViewModel>(cartViewModel: T): T {
    const [, forceUpdate] = useReducer((x: number) => x + 1, 0);

    useEffect(() => {
        const view: BaseView = {onViewModelChanged: () => forceUpdate()};
        cartViewModel.attachView(view);
        return () => cartViewModel.detachView(view);
    }, [cartViewModel]);

    return cartViewModel;
}
