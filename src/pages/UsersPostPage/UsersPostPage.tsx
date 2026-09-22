import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { getPostsByUserUseCase } from '../../di';
import PostUserListComponents from '../../presentation/view/post/PostUserListComponents';
import PostUserListViewModelImpl
    from "../../presentation/view-model/post/get-list-by-user-id/PostUserListViewModelimpl";

const UsersPostPage: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();

    const viewModel = useMemo(() => {
        if (!userId) return null;
        return new PostUserListViewModelImpl(getPostsByUserUseCase, userId);
    }, [userId]);

    if (!userId || !viewModel) {
        return <div>Некорректный ID</div>;
    }

    return <PostUserListComponents viewModel={viewModel} />;
};

export default UsersPostPage;