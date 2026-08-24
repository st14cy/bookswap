import React from 'react';
import CatalogItem from "../../../common/Catalog/CatalogItem.tsx";

const All: React.FC = () => {
    return (
        <div>
            <h1>
                Все объявления
            </h1>
            <ul>
                <CatalogItem></CatalogItem>
                <CatalogItem></CatalogItem>
                <CatalogItem></CatalogItem>
            </ul>
        </div>

    );
};

export default All;