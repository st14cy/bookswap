import React, {useMemo} from 'react';
import {useNavigate} from "react-router-dom";
import PostFormViewModelImpl from "../../presentation/view-model/post/form/PostFormViewModelImpl.tsx";
import {authHolder, createPostUsecase, getGenresUseCase, suggestBooksUseCase, updatePostUsecase} from "../../di.ts";
import PostFormComponent from "../../presentation/view/post/PostFormComponent.tsx";



const AddPostPage: React.FC = () => {
    const navigate = useNavigate();

    const viewModel = useMemo(
        () => new PostFormViewModelImpl(createPostUsecase, updatePostUsecase, suggestBooksUseCase, getGenresUseCase, authHolder),
        [],
    );
    return (
        <PostFormComponent
            viewModel={viewModel}
            onSuccess={() => navigate('/')}
        />
    );
};

export default AddPostPage;