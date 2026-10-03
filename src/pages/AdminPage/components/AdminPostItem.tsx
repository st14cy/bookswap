import React from 'react';
import {Link} from 'react-router-dom';
import Button from "../../../shared/ui/Button.tsx";
import Typography from "../../../shared/ui/Typography.tsx";

interface IAdminPostItem {
    id: string;
    name?: string;
    imageSrc?: string;
    author?: string;
    location?: string;
    ownerName?: string;
    onDelete?: () => void;
}

const styles = {
    item: 'flex w-full items-center justify-between gap-24',
    info: 'flex min-w-0 flex-1 items-center gap-14',
    cover: 'w-[160px] h-[160px] shrink-0 object-cover bg-gray rounded-20',
    text: 'flex min-w-0 flex-col gap-[6px]',
    owner: 'text-sm opacity-60',
    actions: 'flex w-[200px] shrink-0 flex-col gap-[10px]',
    button: 'w-full py-12! px-16! text-sm',
};

const AdminPostItem: React.FC<IAdminPostItem> = ({id, name, imageSrc, author, location = 'Неизвестно', ownerName, onDelete}) => {
    return (
        <li className={styles.item}>
            <div className={styles.info}>
                <Link to={`/post/${id}`}>
                    {imageSrc
                        ? <img src={imageSrc} width='160' height='160' className={styles.cover} loading='lazy' alt={`Обложка книги «${name}»`}/>
                        : <div className={styles.cover} role='img' aria-label='Обложки нет'/>}
                </Link>
                <div className={styles.text}>
                    <Link to={`/post/${id}`}>
                        <Typography variant='h3' weight='bold'>{name}</Typography>
                    </Link>
                    <Typography>{author}</Typography>
                    <Typography>{location}</Typography>
                    {ownerName && <span className={styles.owner}>Владелец: {ownerName}</span>}
                </div>
            </div>
            <div className={styles.actions}>
                <Button variant='accent' className={styles.button} onClick={onDelete} disabled={!onDelete}>Удалить</Button>
            </div>
        </li>
    );
};

export default AdminPostItem;
