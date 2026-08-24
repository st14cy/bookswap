import React from 'react';
import CatalogItem from "../../../common/Catalog/CatalogItem.tsx";

const All: React.FC = () => {
    return (
        <ul>
            <CatalogItem></CatalogItem>
            <CatalogItem></CatalogItem>
            <CatalogItem></CatalogItem>
        </ul>
    );
};

export default All;