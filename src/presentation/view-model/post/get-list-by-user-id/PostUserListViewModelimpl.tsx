import type {Post} from "../../../../domain/entity/post/models/Post.ts";
import type {PostUserListViewModel} from "./PostUserListViewModel.tsx";
import type GetMyPostsUseCase from "../../../../domain/interactors/post/GetMyPostsUseCase.ts";
import type ChangePostPublicationUseCase from "../../../../domain/interactors/post/ChangePostPublicationUseCase.ts";
import type DeletePostUseCase from "../../../../domain/interactors/post/DeletePostUseCase.ts";
import type BaseView from "../../../view/BaseView.tsx";

export default class PostUserListViewModelImpl implements PostUserListViewModel {
    public posts: Post[] = [];
    public isLoading = false;
    public isShowError = false;
    public errorMessage = '';
    public actionErrorMessage = '';

    public postPendingDelete: Post | null = null;
    public isDeleting = false;
    public deleteErrorMessage = '';

    private baseView?: BaseView;
    private readonly getMyPostsUseCase: GetMyPostsUseCase;
    private readonly changePostPublicationUseCase: ChangePostPublicationUseCase;
    private readonly deletePostUseCase: DeletePostUseCase;
    private readonly processingIds = new Set<string>();

    public constructor(
        getMyPostsUseCase: GetMyPostsUseCase,
        changePostPublicationUseCase: ChangePostPublicationUseCase,
        deletePostUseCase: DeletePostUseCase,
    ) {
        this.getMyPostsUseCase = getMyPostsUseCase;
        this.changePostPublicationUseCase = changePostPublicationUseCase;
        this.deletePostUseCase = deletePostUseCase;
    }

    public onRequestDelete = (post: Post): void => {
        this.postPendingDelete = post;
        this.deleteErrorMessage = '';
        this.notifyViewAboutChanges();
    };

    public onCancelDelete = (): void => {
        if (this.isDeleting) return;
        this.postPendingDelete = null;
        this.deleteErrorMessage = '';
        this.notifyViewAboutChanges();
    };

    public onConfirmDelete = async (): Promise<void> => {
        const post = this.postPendingDelete;
        if (!post || this.isDeleting) return;

        this.isDeleting = true;
        this.deleteErrorMessage = '';
        this.notifyViewAboutChanges();

        try {
            await this.deletePostUseCase.execute(post.id);
            this.posts = this.posts.filter((p) => p.id !== post.id);
            this.postPendingDelete = null;
        } catch (e) {
            this.deleteErrorMessage = e instanceof Error ? e.message : 'Не удалось удалить объявление';
        } finally {
            this.isDeleting = false;
        }
        this.notifyViewAboutChanges();
    };

    public get activePosts(): Post[] {
        return this.posts.filter((p) => p.isActive);
    }

    public get archivedPosts(): Post[] {
        return this.posts.filter((p) => !p.isActive);
    }

    public isProcessing = (postId: string): boolean => this.processingIds.has(postId);

    public onUnpublish = (postId: string): Promise<void> =>
        this.changePublication(postId, () => this.changePostPublicationUseCase.unpublish(postId));

    public onPublish = (postId: string): Promise<void> =>
        this.changePublication(postId, () => this.changePostPublicationUseCase.publish(postId));

    private changePublication = async (postId: string, action: () => Promise<Post>): Promise<void> => {
        if (this.processingIds.has(postId)) return;
        this.processingIds.add(postId);
        this.actionErrorMessage = '';
        this.notifyViewAboutChanges();

        try {
            const updated = await action();
            this.posts = this.posts.map((p) => (p.id === postId ? {...p, isActive: updated.isActive} : p));
        } catch (e) {
            this.actionErrorMessage = e instanceof Error ? e.message : 'Не удалось изменить объявление';
        } finally {
            this.processingIds.delete(postId);
        }
        this.notifyViewAboutChanges();
    };

    public attachView = (v: BaseView) => { this.baseView = v; };
    public detachView = () => { this.baseView = undefined; };

    public onLoadPosts = async (): Promise<void> => {
        this.isLoading = true;
        this.isShowError = false;
        this.errorMessage = '';
        this.notifyViewAboutChanges();

        try {
            this.posts = await this.getMyPostsUseCase.execute();
        } catch (e) {
            this.errorMessage = e instanceof Error ? e.message : 'Не удалось загрузить объявления';
            this.isShowError = true;
        } finally {
            this.isLoading = false;
        }
        this.notifyViewAboutChanges();
    };

    private notifyViewAboutChanges = () => {
        this.baseView?.onViewModelChanged();
    };
}
