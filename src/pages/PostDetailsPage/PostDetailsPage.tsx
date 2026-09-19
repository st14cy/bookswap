import { useParams } from 'react-router-dom';
import {useMemo} from "react";
import {getPostByIdUseCase} from "../../di.ts";
import PostDetailViewModelImpl from "../../presentation/view-model/post/get-by-id/PostDetailViewModelImpl.tsx";
import PostDetailComponent from "../../presentation/view/post/PostDetailComponent.tsx";

const PostDetailsPage: React.FC = () => {
    const { postId } = useParams<{ postId: string }>();

    const viewModel = useMemo(
        () => new PostDetailViewModelImpl(getPostByIdUseCase),
        [],
    );


    if (Number.isNaN(postId)) {
        return <div>Некорректный ID товара</div>;
    }

    return <PostDetailComponent viewModel={viewModel} postId={postId} />;
};

export default PostDetailsPage;
