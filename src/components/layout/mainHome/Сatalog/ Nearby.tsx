import React from 'react';
import CatalogItem from "../../../common/Catalog/CatalogItem.tsx";

const Nearby: React.FC=() => {
    return (
        <div>
            <h1>Рядом с вами</h1>
            <div className="max-w-7xl overflow-x-auto scroll-smooth">
                <div className="flex flex-row gap-60 pb-4">
                    <CatalogItem />
                    <CatalogItem />
                    <CatalogItem />
                    <CatalogItem />
                    <CatalogItem />
                    <CatalogItem />
                    <CatalogItem />
                    <CatalogItem />
                </div>
            </div>
        </div>

    );
};

export default Nearby;