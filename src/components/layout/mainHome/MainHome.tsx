import React from 'react';
import CatalogControls from "../../common/Catalog/CatalogControls.tsx";
import MainCatalog from "./catalog/MainCatalog.tsx";


const MainHome : React.FC=()=>{
    return (
        <main>
            /* Контролы взаимодействия с каталогом */
            <CatalogControls></CatalogControls>
            /* Основной каталог */
            <MainCatalog></MainCatalog>
        </main>
    )
}

export default MainHome;
