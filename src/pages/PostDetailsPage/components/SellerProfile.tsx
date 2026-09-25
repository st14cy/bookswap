import React, {useEffect, useMemo, useReducer} from 'react';
import Typography from "../../../shared/ui/Typography.tsx";
import Button from "../../../shared/ui/Button.tsx";
import type BaseView from "../../../presentation/view/BaseView.tsx";
import SellerProfileViewModelImpl from "../../../presentation/view-model/seller/SellerProfileViewModelImpl.tsx";
import {getSellerUseCase} from "../../../di.ts";

interface Props {
    sellerId?: string;
}

const pluralRules = new Intl.PluralRules('ru-RU');
const advertisementsWord: Record<string, string> = {
    one: 'объявление',
    few: 'объявления',
    many: 'объявлений',
    other: 'объявления',
};

const formatAdvertisements = (count: number) =>
    `${count} ${advertisementsWord[pluralRules.select(count)]}`;

const formatRegisteredAt = (value: string) =>
    new Date(value).toLocaleDateString('ru-RU', {day: 'numeric', month: 'long', year: 'numeric'});

const formatRating = (rating: number) =>
    rating.toLocaleString('ru-RU', {minimumFractionDigits: 1, maximumFractionDigits: 1});

const renderStars = (rating: number) => {
    const filled = Math.max(0, Math.min(5, Math.round(rating)));
    return '★'.repeat(filled) + '☆'.repeat(5 - filled);
};

const SellerProfile: React.FC<Props> = ({sellerId}) => {
    const [, forceUpdate] = useReducer((n: number) => n + 1, 0);

    const viewModel = useMemo(() => new SellerProfileViewModelImpl(getSellerUseCase), []);

    useEffect(() => {
        const view: BaseView = {onViewModelChanged: () => forceUpdate()};
        viewModel.attachView(view);
        return () => viewModel.detachView();
    }, [viewModel]);

    useEffect(() => {
        if (sellerId) void viewModel.onLoadSeller(sellerId);
    }, [viewModel, sellerId]);

    if (!sellerId) return null;
    if (viewModel.isLoading && !viewModel.seller) return <Typography>Загрузка продавца...</Typography>;
    if (viewModel.isShowError || !viewModel.seller) {
        return <Typography>{viewModel.errorMessage || 'Продавец не найден'}</Typography>;
    }

    const seller = viewModel.seller;

    return (
        <div>
            <div className='grid grid-cols-2'>
                <div className='flex flex-col gap-14  mx-auto'>
                    <Typography weight='bold'>{seller.name}</Typography>
                    <div className='flex items-center gap-2'>
                        {seller.rating > 0 ? (
                            <>
                                <Typography>{formatRating(seller.rating)}</Typography>
                                <div aria-label={`Рейтинг: ${formatRating(seller.rating)} из 5`}>
                                    {renderStars(seller.rating)}
                                </div>
                            </>
                        ) : (
                            <Typography>Пока нет оценок</Typography>
                        )}
                    </div>

                    <div className='flex flex-col gap-[10px] items-start'>
                        <Typography>В Книговороте с {formatRegisteredAt(seller.registeredAt)}</Typography>
                        <Typography>{formatAdvertisements(seller.advertisementsCount)}</Typography>
                        <Button variant='subscribe'>Подписаться</Button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SellerProfile;
