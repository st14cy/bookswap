import React, {useMemo} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import PostFormViewModelImpl from "../../presentation/view-model/post/form/PostFormViewModelImpl.tsx";
import {authHolder, createPostUsecase, getGenresUseCase, getPostByIdUseCase, suggestBooksUseCase, updatePostUsecase} from "../../di.ts";
import PostFormComponent from "../../presentation/view/post/PostFormComponent.tsx";

/** Редактирование объявления: та же форма, что и при создании, но заполненная */
const EditPostPage: React.FC = () => {
    const navigate = useNavigate();
    const { postId } = useParams<{ postId: string }>();

    const viewModel = useMemo(
        () => new PostFormViewModelImpl(
            createPostUsecase,
            updatePostUsecase,
            suggestBooksUseCase,
            getGenresUseCase,
            authHolder,
            getPostByIdUseCase,
            postId,
        ),
        [postId],
    );

    if (!postId) return <div>Объявление не найдено</div>;

    return (
        <PostFormComponent
            viewModel={viewModel}
            onSuccess={() => navigate('/profile')}
        />
    );
};

export default EditPostPage;
