import React from "react";
import Button from "../Button.tsx";
import Input from "../Input.tsx";


const  SearchBar: React.FC = ()=>{
    return (
        <form className='bg-gray rounded-12 mt-4'>
            <Input style='search' name='search' id='search' type='text' placeholder='Поиск'/>
            <Button variant='accent'>Поиск</Button>
            <Button variant='primary'>На карте</Button>
            <Button variant='primary'>Все фильтры</Button>
        </form>
    )
}
export default SearchBar;