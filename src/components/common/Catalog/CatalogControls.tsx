import  React from 'react';
import SearchBar from "./SearchBar.tsx";

const  CatalogControls : React.FC = ()=>{
    return (
        <section className=' bg-background-dark'>
            <div className='grid grid-cols-[1fr_220px] max-w-7xl mx-auto'>
                <SearchBar></SearchBar>
                <span className='flex'>
                <img alt="Иконка навигации"/>
                Россия, Челябинск
                </span>
            </div>
        </section>
    )
}

export default CatalogControls;