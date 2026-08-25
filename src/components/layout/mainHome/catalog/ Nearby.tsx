import React from 'react';
import CatalogItem from "../../../common/Catalog/CatalogItem.tsx";

const Nearby: React.FC=() => {
    return (
        <div>
            <h1>Рядом с вами</h1>
            <ul className="flex flex-row gap-60">
                <CatalogItem></CatalogItem>
                <CatalogItem></CatalogItem>
                <CatalogItem></CatalogItem>
                <CatalogItem></CatalogItem>
            </ul>
        </div>

    );
};

export default Nearby;