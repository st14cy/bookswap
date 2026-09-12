import React from 'react';
import Button from "../../../shared/ui/Button.tsx";
import Typography from "../../../shared/ui/Typography.tsx";

interface IUserProduct {
    name: string;
    imageSrc: string;
    author:string;
    location?:string;
    likeCount?:number;
    viewCount?:number;

}
const UserProductItem:React.FC<IUserProduct> = ({
                                                    name,
                                                    imageSrc,
                                                    author,
                                                    location='Неизвестно',
                                                    likeCount=0,
                                                    viewCount=0}) => {
    return (
    <li>
        <img src={imageSrc}
             width={250}
             height={250}
             className="aspect-square w-full object-contain"
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
                <Button>Снять с публикации</Button>
                <Button>Редактировать</Button>
                <Button>Удалить</Button>
            </div>
        </div>
    </li>
    );
};

export default UserProductItem;