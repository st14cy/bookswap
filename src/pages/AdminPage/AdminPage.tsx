import React, {useEffect, useMemo, useReducer} from 'react';
import {adminDeletePostUseCase, searchPostsUseCase} from '../../di.ts';
import AdminPostListViewModelImpl from '../../presentation/view-model/admin/AdminPostListViewModelImpl.tsx';
import type BaseView from '../../presentation/view/BaseView.tsx';
import AuthorNameFormatter from '../../presentation/util/AuthorNameFormatter.ts';
import SearchBar from '../PostListPage/components/SearchBar.tsx';
import Typography from '../../shared/ui/Typography.tsx';
import Button from '../../shared/ui/Button.tsx';
import Modal from '../../shared/ui/modal/Modal.tsx';
import AdminPostItem from './components/AdminPostItem.tsx';

const styles = {
    page: 'w-full max-w-7xl mx-auto mt-[60px] flex flex-col gap-24',
    list: 'flex flex-col gap-24',
    counter: 'text-sm opacity-60',
    error: 'text-accent',
    modal: 'flex flex-col gap-24',
    modalButtons: 'flex gap-[8px]',
};

const AdminPostList: React.FC = () => {
    const [, forceUpdate] = useReducer((n: number) => n + 1, 0);
    const vm = useMemo(() => new AdminPostListViewModelImpl(searchPostsUseCase, adminDeletePostUseCase), []);

    useEffect(() => {
        const view: BaseView = {onViewModelChanged: () => forceUpdate()};
        vm.attachView(view);
        void vm.onLoadPosts();
        return () => vm.detachView();
    }, [vm]);

    const renderList = () => {
        if (vm.isLoading && vm.posts.length === 0) return <Typography>Загрузка...</Typography>;
        if (vm.isShowError) return <div role="alert" className={styles.error}>{vm.errorMessage}</div>;
        if (vm.posts.length === 0) {
            return (
                <Typography>
                    {vm.appliedQuery ? `По запросу «${vm.appliedQuery}» ничего не найдено` : 'Объявлений нет'}
                </Typography>
            );
        }
        return (
            <ul className={`${styles.list} ${vm.isLoading ? 'opacity-50' : ''}`}>
                {vm.posts.map((post) => (
                    <AdminPostItem
                        key={post.id}
                        id={post.id}
                        name={post.bookTitle}
                        author={AuthorNameFormatter.short(post.authorName)}
                        location={post.city || 'Неизвестно'}
                        imageSrc={post.coverUrl ?? undefined}
                        ownerName={post.ownerName}
                        onDelete={() => vm.onRequestDelete(post)}
                    />
                ))}
            </ul>
        );
    };

    return (
        <section className={styles.page}>
            <SearchBar value={vm.searchQuery} onChange={vm.onChangeSearchQuery} onSubmit={() => void vm.onSearch()}/>
            {!vm.isLoading && !vm.isShowError && <span className={styles.counter}>Найдено объявлений: {vm.posts.length}</span>}
            {renderList()}

            <Modal isOpen={vm.postPendingDelete !== null} onClose={vm.onCancelDelete}>
                <div className={styles.modal}>
                    <Typography variant="h3" weight="bold">Удалить объявление?</Typography>
                    <Typography>
                        «{vm.postPendingDelete?.bookTitle}» будет удалено из каталога. Это действие нельзя отменить.
                    </Typography>
                    {vm.deleteErrorMessage && <div role="alert" className={styles.error}>{vm.deleteErrorMessage}</div>}
                    <div className={styles.modalButtons}>
                        <Button variant="accent" onClick={() => void vm.onConfirmDelete()} disabled={vm.isDeleting}>
                            {vm.isDeleting ? 'Удаление…' : 'Удалить'}
                        </Button>
                        <Button onClick={vm.onCancelDelete} disabled={vm.isDeleting}>Отмена</Button>
                    </div>
                </div>
            </Modal>
        </section>
    );
};

export default AdminPostList;
