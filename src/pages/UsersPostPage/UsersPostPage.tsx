import React, { useMemo } from 'react';
import { authHolder, changePostPublicationUseCase, deletePostUseCase, getMyPostsUseCase } from '../../di';
import PostUserListComponents from '../../presentation/view/post/PostUserListComponents';
import PostUserListViewModelImpl
    from "../../presentation/view-model/post/get-list-by-user-id/PostUserListViewModelimpl";

const UserPosts: React.FC<{ userName: string }> = ({ userName }) => {
    const viewModel = useMemo(
        () => new PostUserListViewModelImpl(getMyPostsUseCase, changePostPublicationUseCase, deletePostUseCase),
        [],
    );

    return <PostUserListComponents viewModel={viewModel} userName={userName} />;
};

const UsersPostPage: React.FC = () => {
    const user = authHolder.getUser();

    return (
        <UserPosts
            key={user?.id ?? ''}
            userName={user ? (user.firstName || user.login) : ''}
        />
    );
};

export default UsersPostPage;
