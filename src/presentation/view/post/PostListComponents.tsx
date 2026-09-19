import React, {useEffect, useMemo, useReducer} from 'react';
import Typography from "../../../shared/ui/Typography.tsx";
import type PostListViewModelImpl from "../../view-model/post/PostListViewModelImpl.tsx";
import type BaseView from "../BaseView.tsx";
import CatalogItem from "../../../pages/CatalogPage/components/CatalogItem.tsx";

interface  Props{
    viewModel:PostListViewModelImpl;
   // onPostClick?:(id:string)=>void;
}

const PostListComponents: React.FC<Props> = ({viewModel}) => {
    const [, forceUpdate] = useReducer((n: number) => n + 1, 0);
    const baseView: BaseView = useMemo(
        () => ({
            onViewModelChanged: () => forceUpdate(),
        }),
        [],
    );

    useEffect(() => {
        viewModel.attachView(baseView);
        viewModel.onLoadPosts();

        return () => {
            viewModel.detachView();
        };
    }, [baseView, viewModel]);

    if (viewModel.isLoading) return <div>Загрузка...</div>;
    if (viewModel.isShowError) return <div style={{ color: 'red' }}>{viewModel.errorMessage}</div>;
    if (viewModel.posts.length === 0) return <div>Постов нет</div>;

    return (
        <div>
            <Typography variant="h2" weight='bold'>Рядом с вами</Typography>
            <div className="max-w-7xl overflow-x-auto scroll-smooth">
                <ul className="flex flex-row gap-60 pb-4">
                    {viewModel.posts.map((post) => (
                        <CatalogItem
                            key={post.id}
                            id={post.id}
                            name={post.bookTitle}
                            author={post.authorName}
                            location={post.city}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PostListComponents;
