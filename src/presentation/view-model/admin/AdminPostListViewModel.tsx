import type {Post} from "../../../domain/entity/post/models/Post.ts";
import type BaseView from "../../view/BaseView.tsx";

export default interface AdminPostListViewModel {
    attachView(baseView: BaseView): void;
    detachView(): void;

    posts: Post[];
    isLoading: boolean;
    isShowError: boolean;
    errorMessage: string;
    searchQuery: string;
    appliedQuery: string;
    onLoadPosts(): Promise<void>;
    onChangeSearchQuery(query: string): void;
    onSearch(): Promise<void>;

    postPendingDelete: Post | null;
    isDeleting: boolean;
    deleteErrorMessage: string;
    onRequestDelete(post: Post): void;
    onCancelDelete(): void;
    onConfirmDelete(): Promise<void>;
}
