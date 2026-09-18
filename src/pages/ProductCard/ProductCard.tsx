import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getProductById} from "../../api/product.ts";
import SellerProfile from "./components/SellerProfile.tsx";
import LikeControl from "../../shared/ui/LikeControl.tsx";
import Typography from "../../shared/ui/Typography.tsx";
import InfoBlock from "../CatalogPage/components/InfoBlock.tsx";
import Button from "../../shared/ui/Button.tsx";
import type {Product} from "../../api/types/advertisement.ts";

const ProductCard: React.FC = () => {
    const {productId} = useParams<{productId: string}>();
    const [product, setProduct] = useState<Product | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!productId) {
            setError("Идентификатор товара не указан");
            return;
        }

        const controller = new AbortController();
        getProductById(productId, controller.signal)
            .then((data) => {
                if (!controller.signal.aborted) {
                    setProduct(data);
                }
            })
            .catch((err: unknown) => {
                if (!controller.signal.aborted) {
                    setError(err instanceof Error ? err.message : "Не удалось загрузить товар");
                }
            });

        return () => controller.abort();
    }, [productId]);

    if (error) return <p role="alert">{error}</p>;
    if (!product) return <div>Загрузка...</div>;

    return (
        <div className="grid grid-cols-2 gap-100">
            <div className="flex flex-col gap-[24px]">
                <section className="relative">
                    <img src="#" alt={`Фотография ${product.bookTitle}`} width="550" height="480"/>
                    <LikeControl/>
                </section>
                <div className="flex flex-col gap-14">
                    <Typography variant='h3'
                                weight="bold">Описание</Typography>
                    <Typography variant='span'>{product.description}</Typography>
                </div>
                <div className="flex flex-col gap-14">
                    <Typography variant='h3'
                                weight="bold">Характеристика</Typography>
                    <ul className="flex flex-col gap-14">
                        <InfoBlock title="Автор" children={product.authorName}/>
                        <InfoBlock title="Жанр" children={product.genreId}/>
                    </ul>
                </div>

                <div className="flex flex-col gap-14">
                    <Typography variant='h3'
                                weight="bold">Местоположение</Typography>
                    <Typography variant='span'>{`${product.city},${product.street}, ${product.houseNumber}`}</Typography>


                </div>
                <div>
                    <Typography variant='span'>{`${product.id},${product.startDate}, ${product.viewsCount} просмотра`}</Typography>
                </div>

            </div>
            <div className="flex flex-col gap-14 max-w-[380px]">
                <Button  variant='accent'>Забрать книгу</Button>
                <SellerProfile/>
                <Button variant='primary'>Написать</Button>
            </div>

        </div>
    );
};

export default ProductCard;
