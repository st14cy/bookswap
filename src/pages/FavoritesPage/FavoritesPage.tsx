import React, {useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {favoritesViewModel} from '../../di.ts';
import useFavoritesViewModel from '../../presentation/hooks/useFavoritesViewModel.ts';
import AuthorNameFormatter from '../../presentation/util/AuthorNameFormatter.ts';
import Typography from '../../shared/ui/Typography.tsx';
import Button from '../../shared/ui/Button.tsx';
import FavoriteItem from './components/FavoriteItem.tsx';

const styles = {
    page: 'w-full max-w-7xl mx-auto mt-[60px] flex flex-col gap-24',
    list: 'flex flex-col gap-24',
    error: 'text-accent',
    link: 'text-blue',
};

const FavoritesPage: React.FC = () => {
    const vm = useFavoritesViewModel(favoritesViewModel);
    const navigate = useNavigate();

    useEffect(() => {
        void vm.loadPosts();
    }, [vm]);

    if (vm.isPostsLoading && vm.posts.length === 0) {
        return (
            <section className={styles.page}>
                <Typography>Загрузка...</Typography>
            </section>
        );
    }

    if (vm.postsErrorMessage) {
        return (
            <section className={styles.page}>
                <div role="alert" className={styles.error}>{vm.postsErrorMessage}</div>
                <div>
                    <Button onClick={() => void vm.loadPosts()}>Повторить</Button>
                </div>
            </section>
        );
    }

    if (vm.posts.length === 0) {
        return (
            <section className={styles.page}>
                <Typography>В избранном пока пусто</Typography>
                <Link to="/" className={styles.link}>Перейти в каталог</Link>
            </section>
        );
    }

    return (
        <section className={styles.page}>
            {vm.actionErrorMessage && <div role="alert" className={styles.error}>{vm.actionErrorMessage}</div>}

            <ul className={styles.list}>
                {vm.posts.map((post) => (
                    <FavoriteItem
                        key={post.id}
                        name={post.bookTitle}
                        author={AuthorNameFormatter.short(post.authorName)}
                        genre={post.genreName || undefined}
                        location={post.city}
                        imageSrc={post.coverUrl ?? undefined}
                        isAvailable={post.isActive}
                        isProcessing={vm.isPending(post.id)}
                        onOpen={() => navigate(`/post/${post.id}`)}
                        onRemove={() => void vm.toggle(post.id)}
                    />
                ))}
            </ul>
        </section>
    );
};

export default FavoritesPage;
