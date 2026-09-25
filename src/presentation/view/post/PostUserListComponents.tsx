import React, {useEffect, useMemo, useReducer, useState} from 'react';
import type {Post} from "../../../domain/entity/post/models/Post.ts";
import {Link, useNavigate} from 'react-router-dom';
import type BaseView from "../BaseView.tsx";
import type PostUserListViewModelimpl from "../../view-model/post/get-list-by-user-id/PostUserListViewModelimpl.tsx";
import Typography from "../../../shared/ui/Typography.tsx";
import UserProductItem from "../../../pages/UserProductList/components/UserProductItem.tsx";
import Modal from "../../../shared/ui/modal/Modal.tsx";
import Button from "../../../shared/ui/Button.tsx";
import AuthorNameFormatter from "../../util/AuthorNameFormatter.ts";

interface Props {
    viewModel: PostUserListViewModelimpl;
    userName: string;
}

type Tab = 'active' | 'archive';

const PostUserListComponents: React.FC<Props> = ({ viewModel, userName }) => {
    const [, forceUpdate] = useReducer((n: number) => n + 1, 0);
    const [tab, setTab] = useState<Tab>('active');
    const navigate = useNavigate();

    const baseView: BaseView = useMemo(
        () => ({ onViewModelChanged: () => forceUpdate() }),
        [],
    );

    useEffect(() => {
        viewModel.attachView(baseView);
        void viewModel.onLoadPosts();
        return () => viewModel.detachView();
    }, [baseView, viewModel]);

    const styles = {
        tab: 'rounded-12 py-12 px-20',
        tabActive: 'bg-accent text-white',
        tabInactive: 'bg-gray text-black',
    };

    const renderList = (posts: Post[], empty: React.ReactNode) => {
        if (viewModel.isLoading) return <Typography>Загрузка...</Typography>;
        if (viewModel.isShowError) {
            return (
                <div role="alert" className="flex flex-col items-start gap-8 text-accent">
                    {viewModel.errorMessage}
                    <button type="button" className="text-blue underline" onClick={() => void viewModel.onLoadPosts()}>
                        Повторить
                    </button>
                </div>
            );
        }
        if (posts.length === 0) return empty;
        return (
            <ul className="flex flex-col gap-24">
                {posts.map((post) => (
                    <UserProductItem
                        key={post.id}
                        name={post.bookTitle}
                        author={AuthorNameFormatter.short(post.authorName)}
                        location={post.city}
                        likeCount={post.likeCount ?? 0}
                        imageSrc={post.coverUrl ?? undefined}
                        isActive={post.isActive}
                        isProcessing={viewModel.isProcessing(post.id)}
                        onEdit={() => navigate(`/posts/${post.id}/edit`)}
                        onDelete={() => viewModel.onRequestDelete(post)}
                        onTogglePublication={() => void (post.isActive
                            ? viewModel.onUnpublish(post.id)
                            : viewModel.onPublish(post.id))}
                    />
                ))}
            </ul>
        );
    };

    return (
        <div className="flex w-full flex-col gap-6 mt-[60px]">
            <div className="flex flex-col gap-24">
                <div role="tablist" className="flex gap-8">
                    <button
                        type="button"
                        role="tab"
                        aria-selected={tab === 'active'}
                        className={`${styles.tab} ${tab === 'active' ? styles.tabActive : styles.tabInactive}`}
                        onClick={() => setTab('active')}
                    >
                        Активные
                    </button>
                    <button
                        type="button"
                        role="tab"
                        aria-selected={tab === 'archive'}
                        className={`${styles.tab} ${tab === 'archive' ? styles.tabActive : styles.tabInactive}`}
                        onClick={() => setTab('archive')}
                    >
                        Архив
                    </button>
                </div>

                {viewModel.actionErrorMessage && (
                    <div role="alert" className="text-accent">{viewModel.actionErrorMessage}</div>
                )}

                <div role="tabpanel">
                    {tab === 'active'
                        ? renderList(viewModel.activePosts, (
                            <div className="flex flex-col items-start gap-8">
                                <Typography>Нет опубликованных объявлений</Typography>
                                <Link to="/posts/new" className="text-blue">+ разместить объявление</Link>
                            </div>
                        ))
                        : renderList(viewModel.archivedPosts, (
                            <Typography>В архиве пока ничего нет</Typography>
                        ))}
                </div>
            </div>

            <Modal isOpen={viewModel.postPendingDelete !== null} onClose={viewModel.onCancelDelete}>
                <div className="flex flex-col gap-24">
                    <Typography variant="h3" weight="bold">Удалить объявление?</Typography>
                    <Typography>
                        «{viewModel.postPendingDelete?.bookTitle || viewModel.postPendingDelete?.title}» будет удалено.
                        Это действие нельзя отменить.
                    </Typography>

                    {viewModel.deleteErrorMessage && (
                        <div role="alert" className="text-accent">{viewModel.deleteErrorMessage}</div>
                    )}

                    <div className="flex gap-8">
                        <Button variant="accent" onClick={() => void viewModel.onConfirmDelete()} disabled={viewModel.isDeleting}>
                            {viewModel.isDeleting ? 'Удаление…' : 'Удалить'}
                        </Button>
                        <Button onClick={viewModel.onCancelDelete} disabled={viewModel.isDeleting}>
                            Отмена
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default PostUserListComponents;
