import {useMemo} from "react";
import PostListViewModelImpl from "../../presentation/view-model/post/get-list/PostListViewModelImpl.tsx";
import {authViewModel, getAllPostsUseCase, searchPostsUseCase} from "../../di.ts";
import PostListComponents from "../../presentation/view/post/PostListComponents.tsx";
import useAuthViewModel from "../../presentation/hooks/useAuthViewModel.ts";
import AdminPostList from "../AdminPage/AdminPage.tsx";

const PostsPage: React.FC = () => {
    const auth = useAuthViewModel(authViewModel);
    const viewModel = useMemo(
        () => new PostListViewModelImpl(getAllPostsUseCase, searchPostsUseCase),
        [],
    );

    if (auth.isAdmin) return <AdminPostList/>;

    return <PostListComponents viewModel={viewModel} />;
};

export default PostsPage;
