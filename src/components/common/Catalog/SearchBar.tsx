import React from "react";

const  SearchBar: React.FC = ()=>{
    return (
        <form>
            <label className="visually-hidden" htmlFor="search">
                Введите данные
            </label>
            <input name="search" id="search" type="text" placeholder="Поиск"/>

            <button type="submit">Поиск</button>
            <button>На карте</button>
            <button>Все фильтры</button>
        </form>
    )
}
export default SearchBar;