import React, {useEffect, useState} from 'react';
import FavoriteButton from "../favorite/FavoriteButton.tsx";
import type PostDetailViewModelImpl from "../../view-model/post/get-by-id/PostDetailViewModelImpl.tsx";
import type BaseView from "../BaseView.tsx";
import Typography from "../../../shared/ui/Typography.tsx";
import InfoBlock from "../../../pages/PostListPage/components/InfoBlock.tsx";
import Button from "../../../shared/ui/Button.tsx";
import SellerProfile from "../../../pages/PostDetailsPage/components/SellerProfile.tsx";
import {useNavigate} from "react-router-dom";
import {cartViewModel} from "../../../di.ts";
import useCartViewModel from "../../hooks/useCartViewModel.ts";

interface Props {
    viewModel: PostDetailViewModelImpl;
    postId: string;
}


const PostDetailComponent: React.FC<Props> = ({viewModel, postId}) => {
    const [, forceUpdate] = useState(0);
    const cart = useCartViewModel(cartViewModel);
    const navigate = useNavigate();

    const baseView: BaseView = {
        onViewModelChanged: () => forceUpdate((n) => n + 1),
    };

    useEffect(() => {
        viewModel.attachView(baseView);
        viewModel.onLoadPost(postId);
        return () => viewModel.detachView();
    }, [postId]);

    if (viewModel.isLoading) return <div>Загрузка поста...</div>;
    if (viewModel.isShowError) return <div style={{ color: 'red' }}>{viewModel.errorMessage}</div>;
    if (!viewModel.post) return <div>Пост не найден</div>;
    return (
        <div className="grid grid-cols-2 gap-100 mt-[60px] mx-auto max-w-7xl">
            <div className="flex flex-col gap-[24px]">
                <section className="relative">
                    {viewModel.post.coverUrl
                        ? <img src={viewModel.post.coverUrl}
                               alt={`Обложка книги «${viewModel.post.bookTitle}»`}
                               width="550" height="480"
                               className="w-[550px] h-[480px] object-contain bg-gray rounded-20"/>
                        : <div className="w-[550px] h-[480px] bg-gray rounded-20" role="img" aria-label="Обложки нет"/>}
                    <FavoriteButton postId={viewModel.post.id}/>
                </section>
                <div className="flex flex-col gap-14">
                    <Typography variant='h3'
                                weight="bold">Описание</Typography>
                    <Typography variant='span'>{viewModel.post.description}</Typography>
                </div>
                <div className="flex flex-col gap-14">
                    <Typography variant='h3'
                                weight="bold">Характеристика</Typography>
                    <ul className="flex flex-col gap-14">
                        <InfoBlock title="Автор" children={viewModel.post.authorName}/>
                        <InfoBlock title="Жанр" children={viewModel.post.genreName || 'Не указан'}/>
                    </ul>
                </div>

                <div className="flex flex-col gap-14">
                    <Typography variant='h3'
                                weight="bold">Местоположение</Typography>
                    <Typography variant='span'>{`${viewModel.post.city},${viewModel.post.street}, ${viewModel.post.houseNumber}`}</Typography>


                </div>
                <div>
                    <Typography variant='span'>{`${viewModel.post.id},${viewModel.post}, ${viewModel.post} просмотра`}</Typography>
                </div>

            </div>
            <div className="flex flex-col gap-14 max-w-[380px]">
                {cart.isInCart(viewModel.post.id) ? (
                    <Button variant='accent' onClick={() => navigate('/cart')}>В корзине — перейти</Button>
                ) : (
                    <Button
                        variant='accent'
                        disabled={cart.isPending(viewModel.post.id) || !viewModel.post.isActive}
                        onClick={() => void cart.add(viewModel.post!.id)}
                    >
                        {!viewModel.post.isActive
                            ? 'Книгу уже забрали'
                            : cart.isPending(viewModel.post.id) ? 'Добавляем...' : 'Забрать книгу'}
                    </Button>
                )}
                {cart.actionErrorPostId === viewModel.post.id && cart.actionErrorMessage && (
                    <p role="alert" className="text-accent">{cart.actionErrorMessage}</p>
                )}
                <SellerProfile sellerId={viewModel.post.ownerId}/>
                <Button variant='primary'>Написать</Button>
            </div>

        </div>
    );
};

export default PostDetailComponent;
