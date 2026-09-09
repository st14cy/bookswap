import React from 'react';
import CatalogItem from "../CatalogItem.tsx";
import Typography from '../../../../shared/ui/Typography.tsx';

const All: React.FC = () => {
    return (
        <div>
            <Typography variant="h2" weight='bold'>все объявления</Typography>
            <div className="max-w-7xl overflow-x-auto scroll-smooth">
                <div className="flex flex-row flex-wrap gap-60 pb-4">
                <CatalogItem></CatalogItem>
                <CatalogItem></CatalogItem>
                <CatalogItem></CatalogItem>
                <CatalogItem></CatalogItem>
                <CatalogItem></CatalogItem>
                <CatalogItem></CatalogItem>
                </div>
            </div>
        </div>
    );
};

export default All;