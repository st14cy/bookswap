import type BaseViewModel from "../../BaseViewModel.tsx";
import type {Post} from "../../../../domain/entity/post/models/Post.ts";

export interface PostUserListViewModel  extends BaseViewModel {
    posts: Post[];
    isLoading: boolean;
    isShowError: boolean;
    errorMessage: string;
    onLoadPosts: () => Promise<void>;

    activePosts: Post[];
    archivedPosts: Post[];
    actionErrorMessage: string;
    isProcessing: (postId: string) => boolean;
    onUnpublish: (postId: string) => Promise<void>;
    onPublish: (postId: string) => Promise<void>;

    postPendingDelete: Post | null;
    isDeleting: boolean;
    deleteErrorMessage: string;
    onRequestDelete: (post: Post) => void;
    onCancelDelete: () => void;
    onConfirmDelete: () => Promise<void>;
}