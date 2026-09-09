import React from 'react';
import LikeControl from "../../../shared/ui/LikeControl.tsx";


interface CatalogItemProps {
    name?: string;
    author?:string;
    location?:string;
}

const CatalogItem: React.FC<CatalogItemProps>=({
    name='Название',
    author='Автор',
    location='Неизвестно',})=>{
    return (
      <li>
          <article className="relative">
              <a>
                 <img src='#' width='260' height='250' className='bg-gray rounded-20'  alt='Изображение книги'/>
              </a>

              <div>
               <LikeControl />
              </div>
              <a className='flex flex-col gap-4 items-center' href='#'>
                  <h3 className='flex flex-row gap-10'>
                      <span>
                        {name}
                      </span>
                      <span>
                       {author}
                      </span>
                  </h3>
                  <span className='flex flex-row '>
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.9999 19.25C14.2083 15.95 17.4166 12.995 17.4166 9.35C17.4166 5.70492 14.5438 2.75 10.9999 2.75C7.45609 2.75 4.58325 5.70492 4.58325 9.35C4.58325 12.995 7.79159 15.95 10.9999 19.25Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M11.0001 11C12.0126 11 12.8334 10.1793 12.8334 9.16671C12.8334 8.15418 12.0126 7.33337 11.0001 7.33337C9.98753 7.33337 9.16675 8.15418 9.16675 9.16671C9.16675 10.1793 9.98753 11 11.0001 11Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                      {location}
                  </span>
              </a>
          </article>
      </li>
    )
}
export default CatalogItem;

