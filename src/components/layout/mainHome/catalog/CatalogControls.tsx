import  React from 'react';
import SearchBar from "../../../common/SearchBar.tsx";

const  CatalogControls : React.FC = ()=>{
    return (
        <section className='grid grid-cols-[1fr_220px]'>
            <SearchBar></SearchBar>
            <span className='flex'>
                <img alt="Иконка навигации"/>
                Россия, Челябинск
            </span>
        </section>
    )
}

export default CatalogControls;