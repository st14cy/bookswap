import React from 'react';
import Button from "../../../shared/ui/Button.tsx";
import Typography from "../../../shared/ui/Typography.tsx";

interface IFavoriteItem {
    name?: string;
    imageSrc?: string;
    author?: string;
    genre?: string;
    location?: string;
    isAvailable?: boolean;
    isProcessing?: boolean;
    onOpen?: () => void;
    onRemove?: () => void;
}

const styles = {
    item: 'flex w-full items-center justify-between gap-24',
    info: 'flex min-w-0 flex-1 items-center gap-14',
    cover: 'w-[250px] h-[250px] shrink-0 object-cover bg-gray rounded-20',
    text: 'flex min-w-0 flex-col gap-8',
    unavailable: 'text-accent',
    actions: 'flex w-[220px] shrink-0 flex-col gap-14',
    button: 'w-full py-12! px-16! text-sm',
};

const FavoriteItem: React.FC<IFavoriteItem> = ({
                                                   name,
                                                   imageSrc,
                                                   author,
                                                   genre,
                                                   location = 'Неизвестно',
                                                   isAvailable = true,
                                                   isProcessing = false,
                                                   onOpen,
                                                   onRemove}) => {
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
                {genre && <Typography>{genre}</Typography>}
                <Typography>{location}</Typography>
                {!isAvailable && <Typography className={styles.unavailable}>Объявление снято с публикации</Typography>}
            </div>
        </div>

        <div className={styles.actions}>
            <Button className={styles.button} onClick={onOpen} disabled={!onOpen}>
                Открыть объявление
            </Button>
            <Button className={styles.button} onClick={onRemove} disabled={isProcessing || !onRemove}>
                {isProcessing ? 'Подождите…' : 'Убрать из избранного'}
            </Button>
        </div>
    </li>
    );
};

export default FavoriteItem;
