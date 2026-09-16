import React from 'react';
import {useEffect, useState} from 'react';
import CatalogItem from "../CatalogItem.tsx";
import Typography from '../../../../shared/ui/Typography.tsx';
import {getAllProducts, type Product} from "../../../../api/product.ts";

const All: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const controller = new AbortController();

        getAllProducts(controller.signal)
            .then((data) => {
                if (!controller.signal.aborted) {
                    setProducts(data);
                }
            })
            .catch((err: unknown) => {
                if (!controller.signal.aborted) {
                    setError(
                        err instanceof Error
                            ? err.message
                            : "Произошла неизвестная ошибка",
                    );
                }
            })
            .finally(() => {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            });

        return () => controller.abort();
    }, []);

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p role="alert">{error}</p>;

    return (
        <div>
            <Typography variant="h2" weight='bold'>все объявления</Typography>
            <div className="max-w-7xl overflow-x-auto scroll-smooth">
                {products.length === 0 ? (
                    <p>Товаров пока нет.</p>
                ) : (
                    <ul className="flex flex-row flex-wrap gap-60 pb-4">
                        {products.map((product) => (
                            <CatalogItem
                                key={product.id}
                                id={product.id}
                                name={product.bookTitle}
                                author={product.authorName}
                                location={product.city}
                            />
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default All;