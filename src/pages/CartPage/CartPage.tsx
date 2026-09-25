import React, {useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {cartViewModel} from '../../di.ts';
import useCartViewModel from '../../presentation/hooks/useCartViewModel.ts';
import AuthorNameFormatter from '../../presentation/util/AuthorNameFormatter.ts';
import Typography from '../../shared/ui/Typography.tsx';
import Button from '../../shared/ui/Button.tsx';
import CartItem from './components/CartItem.tsx';

const styles = {
    page: 'w-full max-w-7xl mx-auto mt-[60px] flex flex-col gap-24',
    list: 'flex flex-col gap-24',
    footer: 'flex items-center justify-end gap-24',
    error: 'text-accent',
    link: 'text-blue',
};

const CartPage: React.FC = () => {
    const vm = useCartViewModel(cartViewModel);
    const navigate = useNavigate();

    useEffect(() => {
        void vm.loadItems();
    }, [vm]);

    if (vm.lastOrder) {
        return (

            <section className={styles.page}>
                <Typography variant="h2" weight="bold">Заказ оформлен</Typography>
                <Link to="/" className={styles.link}>Вернуться в каталог</Link>
            </section>
        );
    }

    if (vm.isItemsLoading && vm.items.length === 0) {
        return (
            <section className={styles.page}>
                <Typography>Загрузка...</Typography>
            </section>
        );
    }

    if (vm.itemsErrorMessage) {
        return (
            <section className={styles.page}>
                <div role="alert" className={styles.error}>{vm.itemsErrorMessage}</div>
                <div>
                    <Button onClick={() => void vm.loadItems()}>Повторить</Button>
                </div>
            </section>
        );
    }

    if (vm.items.length === 0) {
        return (
            <section className={styles.page}>
                <Typography>Корзина пуста</Typography>
                <Link to="/" className={styles.link}>Перейти в каталог</Link>
            </section>
        );
    }

    return (
        <section className={styles.page}>
            {vm.actionErrorMessage && <div role="alert" className={styles.error}>{vm.actionErrorMessage}</div>}

            <ul className={styles.list}>
                {vm.items.map(({post}) => (
                    <CartItem
                        key={post.id}
                        name={post.bookTitle}
                        author={AuthorNameFormatter.short(post.authorName)}
                        location={post.city}
                        imageSrc={post.coverUrl ?? undefined}
                        isAvailable={post.isActive}
                        isProcessing={vm.isPending(post.id) || vm.isCheckingOut}
                        onOpen={() => navigate(`/post/${post.id}`)}
                        onRemove={() => void vm.remove(post.id)}
                    />
                ))}
            </ul>

            {vm.checkoutErrorMessage && <div role="alert" className={styles.error}>{vm.checkoutErrorMessage}</div>}

            <div className={styles.footer}>
                <Typography variant="h4">Книг в корзине: {vm.items.length}</Typography>
                <Button variant="accent" onClick={() => void vm.checkout()} disabled={vm.isCheckingOut}>
                    {vm.isCheckingOut ? 'Оформление...' : 'Оформить'}
                </Button>
            </div>
        </section>
    );
};

export default CartPage;
