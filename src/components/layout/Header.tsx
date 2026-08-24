import React from 'react'
import Link from "../common/Link.tsx";

const Header: React.FC = () => {
    return (
        <header className='h-header relative'>

            <div className='max-w-7xl mx-auto flex justify-between items-center w-full px-4'>
                <div className="flex items-center">
                    <img alt="Иконка" src="/icon.png"/>
                    <nav>
                        <ul className="flex flex-wrap items-center justify-center gap-4">
                            <li className="cursor-pointer">Каталог</li>
                            <li className="cursor-pointer">О нас</li>
                        </ul>
                    </nav>
                </div>
                <div className="flex items-center gap-40">
                    <div className="flex gap-40">
                        <Link>+ разместить объявление</Link>
                        <Link>мои объявления</Link>
                    </div>
                    <div className="flex items-center gap-20">
                        <Link>
                            <svg width="32" height="24" viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 8.04969C0 9.98758 0.329897 12.9689 3.29897 15.6522C5.93814 18.0373 14.6804 23.4037 15.0103 23.7019C15.3402 23.8509 15.6701 24 16 24C16.3299 24 16.6598 23.8509 16.9897 23.7019C17.3196 23.4037 26.0619 18.1863 28.701 15.6522C31.6701 12.9689 32 9.98758 32 8.04969C32 3.57764 28.0412 0 23.0928 0C20.4536 0 17.8144 1.34162 16.1649 3.42857C14.5155 1.34162 11.8763 0 8.90722 0C4.12371 0 0 3.57764 0 8.04969Z" fill="#212121"/>
                            </svg>
                        </Link>
                        <Link>
                            <svg width="34" height="27" viewBox="0 0 34 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M1.65973 1.6946C0 3.38919 0 6.1166 0 11.5714V15.4286C0 20.8833 0 23.6107 1.65973 25.3054C3.31946 27 5.99074 27 11.3333 27H22.6667C28.0092 27 30.6805 27 32.3402 25.3054C34 23.6107 34 20.8833 34 15.4286V11.5714C34 6.1166 34 3.38919 32.3402 1.6946C30.6805 4.59807e-07 28.0092 0 22.6667 0H11.3333C5.99074 0 3.31946 4.59807e-07 1.65973 1.6946ZM6.71443 6.10962C5.84643 5.5188 4.67368 5.75827 4.09502 6.64451C3.51636 7.53074 3.7509 8.72814 4.6189 9.31895L14.9045 16.32C16.1734 17.1838 17.8266 17.1838 19.0955 16.32L29.3811 9.31895C30.249 8.72814 30.4836 7.53074 29.9051 6.64451C29.3263 5.75827 28.1535 5.5188 27.2856 6.10962L17 13.1108L6.71443 6.10962Z" fill="#212121"/>
                            </svg>
                        </Link>
                    </div>
                    <img alt="Пользователь" width='90' height='90' className='bg-gray rounded-full' />
                </div>

            </div>
            <div className='bg-background-dark h-24 absolute bottom-0 left-0 w-full z-[-2]'></div>

        </header>
    )
}

export default Header