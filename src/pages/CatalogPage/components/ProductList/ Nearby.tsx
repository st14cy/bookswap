import React from 'react';
import CatalogItem from "../CatalogItem.tsx";
import Typography from "../../../../shared/ui/Typography.tsx";

const Nearby: React.FC=() => {
    return (
        <div>
            <Typography variant="h2" weight='bold'>Рядом с вами</Typography>
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