import React, { useEffect, useMemo, useReducer } from 'react';

import type PostListViewModelImpl from '../../view-model/post/get-list/PostListViewModelImpl';
import type BaseView from '../BaseView';
import PostItem from '../../../pages/PostListPage/components/PostItem.tsx';
import AuthorNameFormatter from '../../util/AuthorNameFormatter.ts';
import SearchBar from "../../../pages/PostListPage/components/SearchBar.tsx";
import categoryImage from "../../../assets/image/Category.png";
import Typography from "../../../shared/ui/Typography.tsx";

interface Props {
    viewModel: PostListViewModelImpl;
}

const PostListComponents: React.FC<Props> = ({ viewModel }) => {
    const [, forceUpdate] = useReducer((n: number) => n + 1, 0);

    const baseView: BaseView = useMemo(
        () => ({ onViewModelChanged: () => forceUpdate() }),
        [],
    );

    useEffect(() => {
        viewModel.attachView(baseView);
        viewModel.onLoadPosts();
        return () => viewModel.detachView();
    }, [baseView, viewModel]);

    if (viewModel.isLoading) return <div>Загрузка...</div>;
    if (viewModel.isShowError)
        return <div style={{ color: 'red' }}>{viewModel.errorMessage}</div>;
    if (viewModel.posts.length === 0) return <div>Постов нет</div>;

    return (
        <div >
            <div className="flex flex-col items-center bg-background-dark w-full  pt-[40px] mb-[60px]">
                <div className="flex flex-col items-center justify-center max-w-7xl">
                    <SearchBar></SearchBar>
                    <img src={categoryImage} alt="books"/>
                </div>

            </div>
            <ul className="grid grid-cols-4 gap-60 w-full max-w-7xl mx-auto pb-4">
                {viewModel.posts.map((post) => (
                    <PostItem
                        key={post.id}
                        id={post.id}
                        name={post.bookTitle}
                        author={AuthorNameFormatter.short(post.authorName)}
                        coverUrl={post.coverUrl}
                        location={post.city || 'Неизвестно'}
                    />
                ))}
            </ul>

        </div>
    );
};

export default PostListComponents;
