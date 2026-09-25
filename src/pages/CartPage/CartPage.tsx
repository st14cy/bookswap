import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {cartViewModel} from '../../di.ts';
import useCartViewModel from '../../presentation/hooks/useCartViewModel.ts';
import AuthorNameFormatter from '../../presentation/util/AuthorNameFormatter.ts';

const CartPage: React.FC = () => {
    const vm = useCartViewModel(cartViewModel);

    useEffect(() => {
        void vm.loadItems();
    }, [vm]);

    if (vm.lastOrder) {
        return (
            <section>
                <h2>Заказ оформлен</h2>
                <p>Номер заказа: {vm.lastOrder.id}</p>
                <ul>
                    {vm.lastOrder.items.map((item) => (
                        <li key={item.advertisementId}>
                            {item.bookTitle} — {AuthorNameFormatter.short(item.author)}
                        </li>
                    ))}
                </ul>
                <Link to="/">Вернуться в каталог</Link>
            </section>
        );
    }

    if (vm.isItemsLoading && vm.items.length === 0) {
        return <p>Загрузка...</p>;
    }

    if (vm.itemsErrorMessage) {
        return (
            <section>
                <p role="alert">{vm.itemsErrorMessage}</p>
                <button type="button" onClick={() => void vm.loadItems()}>Повторить</button>
            </section>
        );
    }

    if (vm.items.length === 0) {
        return (
            <section>
                <p>Корзина пуста</p>
                <Link to="/">Перейти в каталог</Link>
            </section>
        );
    }

    return (
        <section>
            <h2>Корзина ({vm.items.length})</h2>

            {vm.actionErrorMessage && <p role="alert">{vm.actionErrorMessage}</p>}

            <ul>
                {vm.items.map(({post}) => (
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
                            <p>{post.city}</p>
                            {!post.isActive && <p>Книга уже недоступна</p>}
                            <button
                                type="button"
                                disabled={vm.isPending(post.id) || vm.isCheckingOut}
                                onClick={() => void vm.remove(post.id)}
                            >
                                Убрать из корзины
                            </button>
                        </article>
                    </li>
                ))}
            </ul>

            {vm.checkoutErrorMessage && <p role="alert">{vm.checkoutErrorMessage}</p>}

            <button
                type="button"
                disabled={vm.isCheckingOut}
                onClick={() => void vm.checkout()}
            >
                {vm.isCheckingOut ? 'Оформление...' : 'Оформить'}
            </button>
        </section>
    );
};

export default CartPage;
