import type PostListViewModel from "./PostListViewModel.tsx";
import type {Post} from "../../../../domain/entity/post/models/Post.ts";
import type BaseView from "../../../view/BaseView.tsx";
import type GetAllPostUseCase from "../../../../domain/interactors/post/GetAllPostUseCase.tsx";
import type SearchPostsUseCase from "../../../../domain/interactors/post/SearchPostsUseCase.tsx";

const SEARCH_DELAY_MS = 400;

export default class PostListViewModelImpl implements PostListViewModel {
    public posts: Post[];
    public isLoading: boolean;
    public errorMessage: string;
    public isShowError: boolean;
    public searchQuery: string;
    public appliedQuery: string;

    private baseView?: BaseView;
    private getAllPostUseCase: GetAllPostUseCase;
    private searchPostsUseCase: SearchPostsUseCase;
    private searchTimer: ReturnType<typeof setTimeout> | null = null;
    private requestId = 0;

    public constructor(getAllPostUseCase: GetAllPostUseCase, searchPostsUseCase: SearchPostsUseCase) {
        this.getAllPostUseCase = getAllPostUseCase;
        this.searchPostsUseCase = searchPostsUseCase;
        this.posts = [];
        this.isLoading = false;
        this.isShowError = false;
        this.errorMessage = '';
        this.searchQuery = '';
        this.appliedQuery = '';
    }

    public attachView(baseView: BaseView): void {
        this.baseView = baseView;
    }

    detachView(): void {
        this.clearSearchTimer();
        this.baseView = undefined;
    }

    public onLoadPosts = async (): Promise<void> => {
        await this.load(() => this.getAllPostUseCase.execute(), '');
    };

    public onChangeSearchQuery = (query: string): void => {
        this.searchQuery = query;
        this.notifyViewAboutChanges();

        this.clearSearchTimer();
        this.searchTimer = setTimeout(() => void this.onSearch(), SEARCH_DELAY_MS);
    };

    public onSearch = async (): Promise<void> => {
        this.clearSearchTimer();
        const query = this.searchQuery.trim();
        await this.load(() => this.searchPostsUseCase.execute(query), query);
    };

    private load = async (request: () => Promise<Post[]>, query: string): Promise<void> => {
        const requestId = ++this.requestId;
        this.isLoading = true;
        this.isShowError = false;
        this.errorMessage = '';
        this.notifyViewAboutChanges();

        try {
            const posts = await request();
            if (requestId !== this.requestId) return;
            this.posts = posts;
            this.appliedQuery = query;
        } catch (e) {
            if (requestId !== this.requestId) return;
            this.isShowError = true;
            this.errorMessage = e instanceof Error ? e.message : 'Load error';
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
        if (this.baseView) {
            this.baseView.onViewModelChanged();
        }
    };
}
