import React from 'react';
import LikeControl from '../../../shared/ui/LikeControl.tsx';
import useFavoritesViewModel from '../../hooks/useFavoritesViewModel.ts';
import {favoritesViewModel} from '../../../di.ts';

interface Props {
    postId: string;
}

const FavoriteButton: React.FC<Props> = ({postId}) => {
    const vm = useFavoritesViewModel(favoritesViewModel);

    return (
        <LikeControl
            isLiked={vm.isFavorite(postId)}
            disabled={vm.isPending(postId)}
            onToggle={() => void vm.toggle(postId)}
        />
    );
};

export default FavoriteButton;
