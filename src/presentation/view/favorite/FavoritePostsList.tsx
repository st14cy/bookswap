import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import Typography from '../../../shared/ui/Typography.tsx';
import Button from '../../../shared/ui/Button.tsx';
import PostItem from '../../../pages/PostListPage/components/PostItem.tsx';
import AuthorNameFormatter from '../../util/AuthorNameFormatter.ts';
import useFavoritesViewModel from '../../hooks/useFavoritesViewModel.ts';
import {favoritesViewModel} from '../../../di.ts';

const FavoritePostsList: React.FC = () => {
    const vm = useFavoritesViewModel(favoritesViewModel);

    useEffect(() => {
        void vm.loadPosts();
    }, [vm]);

    if (vm.isPostsLoading && vm.posts.length === 0) return <Typography>Загрузка...</Typography>;

    if (vm.postsErrorMessage) {
        return (
            <div role="alert" className="flex flex-col items-start gap-8 text-accent">
                {vm.postsErrorMessage}
                <Button onClick={() => void vm.loadPosts()}>Повторить</Button>
            </div>
        );
    }

    if (vm.posts.length === 0) {
        return (
            <div className="flex flex-col items-start gap-8">
                <Typography>В избранном пока пусто — нажмите ♥ на понравившейся книге</Typography>
                <Link to="/" className="text-blue">Перейти в каталог</Link>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-24">
            {vm.actionErrorMessage && <div role="alert" className="text-accent">{vm.actionErrorMessage}</div>}
            <ul className="flex flex-wrap gap-60">
                {vm.posts.map((post) => (
                    <PostItem
                        key={post.id}
                        id={post.id}
                        name={post.bookTitle}
                        author={AuthorNameFormatter.short(post.authorName)}
                        coverUrl={post.coverUrl}
                        location={post.city || '—'}
                    />
                ))}
            </ul>
        </div>
    );
};

export default FavoritePostsList;
