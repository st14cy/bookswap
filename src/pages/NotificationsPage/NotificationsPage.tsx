import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {notificationsViewModel} from '../../di.ts';
import useNotificationsViewModel from '../../presentation/hooks/useNotificationsViewModel.ts';
import Typography from '../../shared/ui/Typography.tsx';
import Button from '../../shared/ui/Button.tsx';
import NotificationItem from './components/NotificationItem.tsx';

const styles = {
    page: 'w-full max-w-7xl mx-auto mt-[60px] flex flex-col gap-24',
    list: 'flex flex-col gap-14',
    empty: 'flex flex-col items-center gap-14 rounded-20 bg-gray px-24 py-40 text-center',
    error: 'text-accent',
    link: 'text-blue',
};

const NotificationsPage: React.FC = () => {
    const vm = useNotificationsViewModel(notificationsViewModel);

    useEffect(() => {
        void vm.loadItems().then(() => vm.markAllRead());
    }, [vm]);

    if (vm.isLoading && vm.items.length === 0) {
        return (
            <section className={styles.page}>
                <Typography>Загрузка...</Typography>
            </section>
        );
    }

    if (vm.errorMessage) {
        return (
            <section className={styles.page}>
                <div role="alert" className={styles.error}>{vm.errorMessage}</div>
                <div>
                    <Button onClick={() => void vm.loadItems()}>Повторить</Button>
                </div>
            </section>
        );
    }

    if (vm.items.length === 0) {
        return (
            <section className={styles.page}>
                <div className={styles.empty}>
                    <Typography variant="h3" weight="bold">Уведомлений пока нет</Typography>
                    <Link to="/" className={styles.link}>Перейти в каталог</Link>
                </div>
            </section>
        );
    }

    return (
        <section className={styles.page}>
            <ul className={styles.list}>
                {vm.items.map((item) => (
                    <NotificationItem
                        key={item.id}
                        message={item.message}
                        createdAt={item.createdAt}
                        isNew={!item.isRead}
                        postId={item.advertisementId}
                    />
                ))}
            </ul>
        </section>
    );
};

export default NotificationsPage;
