import React, {useEffect, useMemo, useReducer} from 'react';
import type BaseView from "../BaseView.tsx";
import PostUserListViewModelimpl from "../../view-model/post/get-list-by-user-id/PostUserListViewModelimpl.tsx";
import Typography from "../../../shared/ui/Typography.tsx";
import UserProductItem from "../../../pages/UserProductList/components/UserProductItem.tsx";

interface Props {
    viewModel: PostUserListViewModelimpl;
    userId: string;
}


const PostUserListComponents: React.FC<Props> = ({ viewModel }) => {
    const [, forceUpdate] = useReducer((n) => n + 1, 0);
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
    if (viewModel.isShowError) return <div style={{ color: 'red' }}>{viewModel.errorMessage}</div>;
    if (viewModel.posts.length === 0) return <div>Постов нет</div>;

    if (viewModel.isLoading) return <div>Загрузка...</div>;
    if (viewModel.isShowError)
        return <div style={{ color: 'red' }}>{viewModel.errorMessage}</div>;
    if (viewModel.posts.length === 0) return <div>Постов нет</div>;
    return (
        <div className="flex flex-col gap-6">
            <header className="flex flex-col items-center gap-3">
                <img
                    src="#"
                    height={130}
                    width={130}
                    className="h-[130px] w-[130px] rounded-full object-cover"
                    alt="Фото пользователя"
                />

                <div
                    className="flex items-center gap-2"
                    aria-label="Рейтинг: 3 из 5"
                >
                    <Typography>3,0</Typography>

                    <span aria-hidden="true" className="text-yellow-500">
                        ★★★☆☆
                    </span>
                </div>
            </header>

            <div className="tab">
                <input checked id="tab-btn-1" name="tab-btn" type="radio" value=""/>
                <label htmlFor="tab-btn-1">Активные</label>
                <input id="tab-btn-2" name="tab-btn" type="radio" value=""/>
                <label htmlFor="tab-btn-2">Архив</label>
                <div className="tab-content" id="content-1">
                    {viewModel.posts.map((post) => (
                        <UserProductItem
                            key={post.id}
                            name={post.bookTitle}
                            author={post.authorName}
                            location={post.city}
                            // imageSrc={...}
                            // likeCount={...}
                            // viewCount={...}
                        />
                    ))}
                </div>
                <div className="tab-content" id="content-2">
                    <UserProductItem/>
                    <UserProductItem/>
                    <UserProductItem/>
                    <UserProductItem/>
                </div>

            </div>
        </div>
    );
};

export default PostUserListComponents;