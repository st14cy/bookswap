import React from 'react';
import CatalogControls from "./components/CatalogControls.tsx";
import MainCatalog from "./components/ProductList/MainCatalog.tsx";


const CatalogPage : React.FC=()=>{
    return (
        <main>
            <CatalogControls></CatalogControls>
            <MainCatalog></MainCatalog>
        </main>
    )
}

export default CatalogPage;
