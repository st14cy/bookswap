import type BaseViewModel from "../../BaseViewModel.tsx";
import type {Post} from "../../../../domain/entity/post/models/Post.ts";

export interface PostUserListViewModel  extends BaseViewModel {
    posts: Post[];
    isLoading: boolean;
    isShowError: boolean;
    errorMessage: string;
    onLoadPosts: () => Promise<void>;
}