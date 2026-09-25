import React from 'react';
import FavoriteButton from "../../../presentation/view/favorite/FavoriteButton.tsx";
import {Link} from "react-router-dom";

interface ICatalogItemProps {
    id: string;
    name?: string;
    author?: string;
    location?: string;
    coverUrl?: string | null;
}

const styles = {
    card: 'flex w-[260px] flex-col gap-14',
    coverWrapper: 'relative w-[260px] h-[250px]',
    cover: 'block w-[260px] h-[250px] object-cover bg-gray rounded-20',
    info: 'flex flex-col gap-8',
    title: 'flex min-w-0 flex-col gap-4',
    name: 'text-[18px] font-bold break-words',
    author: 'break-words opacity-70',
    location: 'flex items-center gap-4',
};

const PostItem: React.FC<ICatalogItemProps> = ({
    id,
    name = 'Название',
    author = 'Автор',
    location = 'Неизвестно',
    coverUrl}) => {
    return (
      <li>
          <article className={styles.card}>
              <div className={styles.coverWrapper}>
                  <Link to={`/post/${id}`}>
                      {coverUrl
                          ? <img src={coverUrl} width='260' height='250' className={styles.cover} alt={`Обложка книги «${name}»`} loading='lazy'/>
                          : <div className={styles.cover} role='img' aria-label='Обложки нет'/>}
                  </Link>
                  <FavoriteButton postId={id} />
              </div>

              <Link className={styles.info} to={`/post/${id}`}>
                  <h3 className={styles.title}>
                      <span className={styles.name}>{name}</span>
                      <span className={styles.author}>{author}</span>
                  </h3>
                  <span className={styles.location}>
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                          <path d="M10.9999 19.25C14.2083 15.95 17.4166 12.995 17.4166 9.35C17.4166 5.70492 14.5438 2.75 10.9999 2.75C7.45609 2.75 4.58325 5.70492 4.58325 9.35C4.58325 12.995 7.79159 15.95 10.9999 19.25Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M11.0001 11C12.0126 11 12.8334 10.1793 12.8334 9.16671C12.8334 8.15418 12.0126 7.33337 11.0001 7.33337C9.98753 7.33337 9.16675 8.15418 9.16675 9.16671C9.16675 10.1793 9.98753 11 11.0001 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {location}
                  </span>
              </Link>
          </article>
      </li>
    );
};

export default PostItem;
