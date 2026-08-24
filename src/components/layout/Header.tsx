import React from 'react'

const Header: React.FC = () => {
    return (
        <header className="flex justify-between items-center w-full">
            <div className="flex items-center">
                <img alt="Иконка"/>
                <nav>
                    <ul className="flex flex-wrap items-center justify-center">
                        <li>
                            Каталог
                        </li>
                        <li>
                            О нас
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="flex items-center justify-left">
                <button>
                    + разместить объявление
                </button>
                <div className="flex items-center justify-center">
                    <img alt="Сердце"/>
                    <img alt="Почта"/>
                    <img alt="Пользоватль"/>
                </div>
            </div>

        </header>

    )
}

export default Header