import type BaseViewModel from "../../BaseViewModel.tsx";
import type {Post} from "../../../../domain/entity/post/models/Post.ts";

export interface PostUserListViewModel  extends BaseViewModel {
    posts: Post[];
    isLoading: boolean;
    isShowError: boolean;
    errorMessage: string;
    onLoadPosts: () => Promise<void>;

    /** Опубликованные объявления (вкладка «Активные») */
    activePosts: Post[];
    /** Снятые с публикации (вкладка «Архив») */
    archivedPosts: Post[];
    actionErrorMessage: string;
    /** Объявление сейчас снимается/публикуется — кнопку блокируем */
    isProcessing: (postId: string) => boolean;
    onUnpublish: (postId: string) => Promise<void>;
    onPublish: (postId: string) => Promise<void>;

    // --- удаление с подтверждением ---
    /** Объявление, для которого открыто окно «Удалить?» (null — окно закрыто) */
    postPendingDelete: Post | null;
    isDeleting: boolean;
    deleteErrorMessage: string;
    onRequestDelete: (post: Post) => void;
    onCancelDelete: () => void;
    onConfirmDelete: () => Promise<void>;
}