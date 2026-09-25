import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {notificationsViewModel} from '../../di.ts';
import useNotificationsViewModel from '../../presentation/hooks/useNotificationsViewModel.ts';

const formatDate = (value: string): string =>
    new Date(value).toLocaleString('ru-RU', {day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'});

const NotificationsPage: React.FC = () => {
    const vm = useNotificationsViewModel(notificationsViewModel);

    useEffect(() => {
        void vm.loadItems().then(() => vm.markAllRead());
    }, [vm]);

    if (vm.isLoading && vm.items.length === 0) {
        return <p>Загрузка...</p>;
    }

    if (vm.errorMessage) {
        return (
            <section>
                <p role="alert">{vm.errorMessage}</p>
                <button type="button" onClick={() => void vm.loadItems()}>Повторить</button>
            </section>
        );
    }

    if (vm.items.length === 0) {
        return (
            <section>
                <p>Уведомлений пока нет</p>
            </section>
        );
    }

    return (
        <section>
            <h2>Уведомления</h2>
            <ul>
                {vm.items.map((item) => (
                    <li key={item.id}>
                        <article>
                            {!item.isRead && <strong>Новое </strong>}
                            <p>{item.message}</p>
                            <time dateTime={item.createdAt}>{formatDate(item.createdAt)}</time>
                            {item.advertisementId && (
                                <p><Link to={`/post/${item.advertisementId}`}>Открыть объявление</Link></p>
                            )}
                        </article>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default NotificationsPage;
