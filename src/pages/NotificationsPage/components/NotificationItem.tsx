import React from 'react';
import {Link} from 'react-router-dom';
import Typography from "../../../shared/ui/Typography.tsx";

interface INotificationItem {
    message: string;
    createdAt: string;
    isNew?: boolean;
    postId?: string | null;
}

const styles = {
    item: 'flex w-full items-center gap-20 rounded-20 border-2 px-24 py-20 transition-colors',
    itemNew: 'border-accent bg-accent/5',
    itemRead: 'border-transparent bg-gray',
    icon: 'flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-full',
    iconNew: 'bg-accent text-white',
    iconRead: 'bg-white text-black',
    body: 'flex min-w-0 flex-1 flex-col gap-8',
    top: 'flex items-center gap-12',
    badge: 'rounded-full bg-accent px-10 py-2 text-xs uppercase text-white',
    date: 'text-sm opacity-60',
    link: 'shrink-0 rounded-12 bg-white px-16 py-12 text-sm transition-colors hover:text-accent',
};

const formatDate = (value: string): string =>
    new Date(value).toLocaleString('ru-RU', {day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'});

const NotificationItem: React.FC<INotificationItem> = ({message, createdAt, isNew = false, postId}) => {
    return (
        <li className={`${styles.item} ${isNew ? styles.itemNew : styles.itemRead}`}>

            <div className={styles.body}>
                <div className={styles.top}>
                    {isNew && <span className={styles.badge}>Новое</span>}
                    <time dateTime={createdAt} className={styles.date}>{formatDate(createdAt)}</time>
                </div>
                <Typography variant="h4">{message}</Typography>
            </div>

            {postId && (
                <Link to={`/post/${postId}`} className={styles.link}>Открыть объявление</Link>
            )}
        </li>
    );
};

export default NotificationItem;
