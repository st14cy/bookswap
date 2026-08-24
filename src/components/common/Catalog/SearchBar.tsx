import React from "react";
import Button from "../Button.tsx";

const  SearchBar: React.FC = ()=>{
    return (
        <form>
            <label className="visually-hidden" htmlFor="search">
                Введите данные
            </label>
            <input name="search" id="search" type="text" placeholder="Поиск"/>

            <Button variant="accent">Поиск</Button>
            <Button variant="primary">На карте</Button>
            <Button variant="primary">Все фильтры</Button>
        </form>
    )
}
export default SearchBar;