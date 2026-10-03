import type AdminPostListViewModel from "./AdminPostListViewModel.tsx";
import type {Post} from "../../../domain/entity/post/models/Post.ts";
import type BaseView from "../../view/BaseView.tsx";
import type SearchPostsUseCase from "../../../domain/interactors/post/SearchPostsUseCase.tsx";
import type AdminDeletePostUseCase from "../../../domain/interactors/post/AdminDeletePostUseCase.ts";

const SEARCH_DELAY_MS = 400;

export default class AdminPostListViewModelImpl implements AdminPostListViewModel {
    public posts: Post[] = [];
    public isLoading = false;
    public isShowError = false;
    public errorMessage = '';
    public searchQuery = '';
    public appliedQuery = '';

    public postPendingDelete: Post | null = null;
    public isDeleting = false;
    public deleteErrorMessage = '';

    private baseView?: BaseView;
    private searchTimer: ReturnType<typeof setTimeout> | null = null;
    private requestId = 0;
    private readonly searchPostsUseCase: SearchPostsUseCase;
    private readonly adminDeletePostUseCase: AdminDeletePostUseCase;

    public constructor(searchPostsUseCase: SearchPostsUseCase, adminDeletePostUseCase: AdminDeletePostUseCase) {
        this.searchPostsUseCase = searchPostsUseCase;
        this.adminDeletePostUseCase = adminDeletePostUseCase;
    }

    public attachView(baseView: BaseView): void {
        this.baseView = baseView;
    }

    public detachView(): void {
        this.clearSearchTimer();
        this.baseView = undefined;
    }

    public onLoadPosts = async (): Promise<void> => {
        await this.load('');
    };

    public onChangeSearchQuery = (query: string): void => {
        this.searchQuery = query;
        this.notifyViewAboutChanges();
        this.clearSearchTimer();
        this.searchTimer = setTimeout(() => void this.onSearch(), SEARCH_DELAY_MS);
    };

    public onSearch = async (): Promise<void> => {
        this.clearSearchTimer();
        await this.load(this.searchQuery.trim());
    };

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
            await this.adminDeletePostUseCase.execute(post.id);
            this.posts = this.posts.filter((p) => p.id !== post.id);
            this.postPendingDelete = null;
        } catch (e) {
            this.deleteErrorMessage = e instanceof Error ? e.message : 'Не удалось удалить объявление';
        } finally {
            this.isDeleting = false;
        }
        this.notifyViewAboutChanges();
    };

    private load = async (query: string): Promise<void> => {
        const requestId = ++this.requestId;
        this.isLoading = true;
        this.isShowError = false;
        this.errorMessage = '';
        this.notifyViewAboutChanges();

        try {
            const posts = await this.searchPostsUseCase.execute(query);
            if (requestId !== this.requestId) return;
            this.posts = posts;
            this.appliedQuery = query;
        } catch (e) {
            if (requestId !== this.requestId) return;
            this.isShowError = true;
            this.errorMessage = e instanceof Error ? e.message : 'Не удалось загрузить объявления';
        }

        this.isLoading = false;
        this.notifyViewAboutChanges();
    };

    private clearSearchTimer(): void {
        if (this.searchTimer !== null) {
            clearTimeout(this.searchTimer);
            this.searchTimer = null;
        }
    }

    private notifyViewAboutChanges = (): void => {
        this.baseView?.onViewModelChanged();
    };
}
