import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {favoritesViewModel} from '../../di.ts';
import useFavoritesViewModel from '../../presentation/hooks/useFavoritesViewModel.ts';
import AuthorNameFormatter from '../../presentation/util/AuthorNameFormatter.ts';

const FavoritesPage: React.FC = () => {
    const vm = useFavoritesViewModel(favoritesViewModel);

    useEffect(() => {
        void vm.loadPosts();
    }, [vm]);

    if (vm.isPostsLoading && vm.posts.length === 0) {
        return <p>Загрузка...</p>;
    }

    if (vm.postsErrorMessage) {
        return (
            <section>
                <p role="alert">{vm.postsErrorMessage}</p>
                <button type="button" onClick={() => void vm.loadPosts()}>Повторить</button>
            </section>
        );
    }

    if (vm.posts.length === 0) {
        return (
            <section>
                <p>В избранном пока пусто</p>
                <Link to="/">Перейти в каталог</Link>
            </section>
        );
    }

    return (
        <section>
            <h2>Избранное ({vm.posts.length})</h2>

            {vm.actionErrorMessage && <p role="alert">{vm.actionErrorMessage}</p>}

            <ul>
                {vm.posts.map((post) => (
                    <li key={post.id}>
                        <article>
                            <Link to={`/post/${post.id}`}>
                                {post.coverUrl && (
                                    <img
                                        src={post.coverUrl}
                                        alt={`Обложка книги «${post.bookTitle}»`}
                                        width={120}
                                        height={180}
                                    />
                                )}
                                <h3>{post.bookTitle}</h3>
                            </Link>
                            <p>{AuthorNameFormatter.short(post.authorName)}</p>
                            {post.genreName && <p>{post.genreName}</p>}
                            <p>{post.city}</p>
                            <button
                                type="button"
                                disabled={vm.isPending(post.id)}
                                onClick={() => void vm.toggle(post.id)}
                            >
                                Убрать из избранного
                            </button>
                        </article>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default FavoritesPage;
