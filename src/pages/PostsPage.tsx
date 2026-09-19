import {useMemo} from "react";
import PostListViewModelImpl from "../presentation/view-model/post/PostListViewModelImpl.tsx";
import {getAllPostsUseCase} from "../di.ts";
import PostListComponents from "../presentation/view/post/PostListComponents.tsx";

const PostsPage: React.FC = () => {
    const viewModel = useMemo(
        () => new PostListViewModelImpl(getAllPostsUseCase),
        [],
    );

    return <PostListComponents viewModel={viewModel} />;
};

export default PostsPage;
