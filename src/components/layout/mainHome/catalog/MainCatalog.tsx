import React from 'react';
import Nearby from "./ Nearby.tsx";
import All from "./All.tsx";

const MainCatalog: React.FC=()=>{
    return (
        <div className='flex flex-col'>
            <Nearby></Nearby>
            <All></All>
        </div>
    )
}

export default MainCatalog;