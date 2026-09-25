import React from 'react';
import Button from "../../../shared/ui/Button.tsx";
import Typography from "../../../shared/ui/Typography.tsx";

interface IUserProduct {
    name?: string;
    imageSrc?: string;
    author?:string;
    location?:string;
    likeCount?:number;
    viewCount?:number;
    isActive?: boolean;
    onTogglePublication?: () => void;
    isProcessing?: boolean;
    onEdit?: () => void;
    onDelete?: () => void;
}

const styles = {
    item: 'flex w-full items-center justify-between gap-24',
    info: 'flex min-w-0 flex-1 items-center gap-14',
    cover: 'w-[250px] h-[250px] shrink-0 object-cover bg-gray rounded-20',
    text: 'flex min-w-0 flex-col gap-8',
    actions: 'flex w-[220px] shrink-0 flex-col gap-14',
    stats: 'flex flex-col gap-4 text-sm',
    button: 'w-full py-12! px-16! text-sm',
};

const UserProductItem:React.FC<IUserProduct> = ({
                                                    name,
                                                    imageSrc,
                                                    author,
                                                    location='Неизвестно',
                                                    likeCount=0,
                                                    viewCount=0,
                                                    isActive=true,
                                                    onTogglePublication,
                                                    isProcessing=false,
                                                    onEdit,
                                                    onDelete}) => {
    return (
    <li className={styles.item}>
        <div className={styles.info}>
            {imageSrc
                ? <img src={imageSrc}
                       width='250'
                       height='250'
                       className={styles.cover}
                       loading='lazy'
                       alt={`Обложка книги «${name}»`} />
                : <div className={styles.cover} role='img' aria-label='Обложки нет'/>}

            <div className={styles.text}>
                <Typography variant='h3' weight='bold'>{name}</Typography>
                <Typography>{author}</Typography>
                <Typography>{location}</Typography>
            </div>
        </div>

        <div className={styles.actions}>
            <dl className={styles.stats}>
                <div className="flex gap-1">
                    <dt>Лайки:</dt>
                    <dd>{likeCount}</dd>
                </div>

                <div className="flex gap-1">
                    <dt>Просмотры:</dt>
                    <dd>{viewCount}</dd>
                </div>
            </dl>

            <Button
                className={styles.button}
                variant={isActive ? 'primary' : 'accent'}
                onClick={onTogglePublication}
                disabled={isProcessing || !onTogglePublication}
            >
                {isProcessing
                    ? 'Подождите…'
                    : isActive ? 'Снять с публикации' : 'Опубликовать снова'}
            </Button>
            <Button className={styles.button} onClick={onEdit} disabled={!onEdit}>Редактировать</Button>
            <Button className={styles.button} onClick={onDelete} disabled={isProcessing || !onDelete}>Удалить</Button>
        </div>
    </li>
    );
};

export default UserProductItem;
