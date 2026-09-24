import React from 'react';
import Button from "../../../shared/ui/Button.tsx";
import Typography from "../../../shared/ui/Typography.tsx";

//interface IUserProduct {
//    name: string;
//    imageSrc: string;
//    author:string;
//    location?:string;
//    likeCount?:number;
//    viewCount?:number;
//
//}

interface IUserProduct {
    name?: string;
    imageSrc?: string;
    author?:string;
    location?:string;
    likeCount?:number;
    viewCount?:number;
    /** false — объявление в архиве */
    isActive?: boolean;
    /** Снять с публикации / опубликовать снова */
    onTogglePublication?: () => void;
    /** Идёт запрос — кнопка заблокирована */
    isProcessing?: boolean;
    /** Переход к редактированию */
    onEdit?: () => void;
    /** Удаление (с подтверждением) */
    onDelete?: () => void;
}
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
    <li>
        <img src={imageSrc}
             width='250'
             height='250'
             alt={`Обложка книги «${name}»`} />

        <div className="grid grid-cols-2 grid-rows-2">
            <Typography variant='h3' weight='bold'>{name}</Typography>
            <Typography>{author}</Typography>
            <Typography className="col-span-2">{location}</Typography>
        </div>

        <div>
            <dl className="flex flex-wrap gap-4 text-sm">
                <div className="flex gap-1">
                    <dt>Лайки:</dt>
                    <dd>{likeCount}</dd>
                </div>

                <div className="flex gap-1">
                    <dt>Просмотры:</dt>
                    <dd>{viewCount}</dd>
                </div>
            </dl>
            <div >
                <Button
                    variant={isActive ? 'primary' : 'accent'}
                    onClick={onTogglePublication}
                    disabled={isProcessing || !onTogglePublication}
                >
                    {isProcessing
                        ? 'Подождите…'
                        : isActive ? 'Снять с публикации' : 'Опубликовать снова'}
                </Button>
                <Button onClick={onEdit} disabled={!onEdit}>Редактировать</Button>
                <Button onClick={onDelete} disabled={isProcessing || !onDelete}>Удалить</Button>
            </div>
        </div>
    </li>
    );
};

export default UserProductItem;