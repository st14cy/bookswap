import React from 'react';
import CatalogControls from "../../common/Catalog/CatalogControls.tsx";
import MainCatalog from "./Сatalog/MainCatalog.tsx";


const MainHome : React.FC=()=>{
    return (
        <main>
            <CatalogControls></CatalogControls>
            <MainCatalog></MainCatalog>
        </main>
    )
}

export default MainHome;
