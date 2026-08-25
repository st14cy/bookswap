import React from 'react';
import Nearby from "./ Nearby.tsx";
import All from "./All.tsx";

const MainCatalog: React.FC=()=>{
    return (
        <section className='flex flex-col max-w-7xl mx-auto'>
            <Nearby></Nearby>
            <All></All>
        </section>
    )
}

export default MainCatalog;