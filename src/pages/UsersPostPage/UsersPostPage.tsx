import React, { useMemo } from 'react';
import { authHolder, changePostPublicationUseCase, deletePostUseCase, getMyPostsUseCase } from '../../di';
import PostUserListComponents from '../../presentation/view/post/PostUserListComponents';
import PostUserListViewModelImpl
    from "../../presentation/view-model/post/get-list-by-user-id/PostUserListViewModelimpl";

/**
 * «Мои объявления». Страница закрыта RequireAuth (routes.ts: requiresAuth),
 * поэтому сюда попадает только авторизованный пользователь.
 */
const UsersPostPage: React.FC = () => {
    const user = authHolder.getUser();
    const userId = user?.id ?? '';

    // Новый пользователь (перелогин) — новая модель и новая загрузка
    const viewModel = useMemo(
        () => new PostUserListViewModelImpl(getMyPostsUseCase, changePostPublicationUseCase, deletePostUseCase),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [userId],
    );

    return (
        <PostUserListComponents
            viewModel={viewModel}
            userName={user ? (user.firstName || user.login) : ''}
        />
    );
};

export default UsersPostPage;
