import CatalogItem from "../CatalogItem.tsx";
import Typography from "../../../../shared/ui/Typography.tsx";
import { getAllProducts } from "../../../../api/product.ts";
import React, {useEffect, useState} from 'react';
import type {Product} from "../../../../api/types/advertisement.ts";

const Nearby: React.FC=() => {

    const [products,setProducts]=useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const controller = new AbortController();

        async function load(): Promise<void> {
            try {
                const data = await getAllProducts(controller.signal);

                if (!controller.signal.aborted) {
                    setProducts(data);
                }
            } catch (err: unknown) {
                if (!controller.signal.aborted) {
                    setError(
                        err instanceof Error
                            ? err.message
                            : "Произошла неизвестная ошибка",
                    );
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }

        void load();

        return () => controller.abort();
    }, []);

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p role="alert">{error}</p>;
    if (products.length === 0) return <p>Товаров пока нет.</p>

    return (
        <div>
            <Typography variant="h2" weight='bold'>Рядом с вами</Typography>
            <div className="max-w-7xl overflow-x-auto scroll-smooth">
                <ul className="flex flex-row gap-60 pb-4">
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
            </div>
        </div>

    );
};

export default Nearby;