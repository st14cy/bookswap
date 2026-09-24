import {useEffect, useReducer} from 'react';
import type FavoritesViewModel from '../view-model/favorite/FavoritesViewModel';
import type BaseView from '../view/BaseView';

export default function useFavoritesViewModel<T extends FavoritesViewModel>(favoritesViewModel: T): T {
    const [, forceUpdate] = useReducer((x: number) => x + 1, 0);

    useEffect(() => {
        const view: BaseView = {onViewModelChanged: () => forceUpdate()};
        favoritesViewModel.attachView(view);
        return () => favoritesViewModel.detachView(view);
    }, [favoritesViewModel]);

    return favoritesViewModel;
}
