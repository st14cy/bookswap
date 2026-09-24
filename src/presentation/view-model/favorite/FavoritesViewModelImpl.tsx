import type FavoritesViewModel from './FavoritesViewModel';
import type BaseView from '../../view/BaseView';
import type {Post} from '../../../domain/entity/post/models/Post';
import type FavoritesUseCase from '../../../domain/interactors/favorite/FavoritesUseCase';
import type AuthHolder from '../../../domain/entity/auth/models/AuthHolder';
import type AuthListener from '../../../domain/entity/auth/models/AuthListener';
import type AuthViewModel from '../auth/AuthViewModel';

export default class FavoritesViewModelImpl implements FavoritesViewModel, AuthListener {
    public posts: Post[] = [];
    public isPostsLoading = false;
    public postsErrorMessage = '';
    public actionErrorMessage = '';

    private favoriteIds = new Set<string>();
    private pendingIds = new Set<string>();
    private views = new Set<BaseView>();
    private loadedForUserId: string | null = null;

    private readonly favoritesUseCase: FavoritesUseCase;
    private readonly authHolder: AuthHolder;
    private readonly authViewModel: AuthViewModel;

    public constructor(favoritesUseCase: FavoritesUseCase, authHolder: AuthHolder, authViewModel: AuthViewModel) {
        this.favoritesUseCase = favoritesUseCase;
        this.authHolder = authHolder;
        this.authViewModel = authViewModel;

        this.authHolder.addAuthListener(this);
        this.onAuthChanged();
    }

    public attachView = (baseView: BaseView): void => { this.views.add(baseView); };
    public detachView = (baseView?: BaseView): void => {
        if (baseView) this.views.delete(baseView);
        else this.views.clear();
    };

    public get count(): number {
        return this.favoriteIds.size;
    }

    public isFavorite = (postId: string): boolean => this.favoriteIds.has(postId);
    public isPending = (postId: string): boolean => this.pendingIds.has(postId);

    public onAuthChanged = (): void => {
        const userId = this.authHolder.getUser()?.id ?? null;
        if (userId === this.loadedForUserId) return;

        this.loadedForUserId = userId;
        this.favoriteIds.clear();
        this.posts = [];
        this.actionErrorMessage = '';
        this.postsErrorMessage = '';
        this.notifyViewAboutChanges();

        if (userId) void this.loadIds();
    };

    public toggle = async (postId: string): Promise<void> => {
        if (!this.authHolder.isUserAuthorized()) {
            this.authViewModel.openAuthModal();
            return;
        }
        if (this.pendingIds.has(postId)) return;

        const wasFavorite = this.favoriteIds.has(postId);
        this.setFavorite(postId, !wasFavorite);
        this.pendingIds.add(postId);
        this.actionErrorMessage = '';
        this.notifyViewAboutChanges();

        try {
            if (wasFavorite) {
                await this.favoritesUseCase.remove(postId);
                this.posts = this.posts.filter((p) => p.id !== postId);
            } else {
                await this.favoritesUseCase.add(postId);
            }
        } catch (e) {
            this.setFavorite(postId, wasFavorite);
            this.actionErrorMessage = e instanceof Error ? e.message : 'Не удалось изменить избранное';
        } finally {
            this.pendingIds.delete(postId);
        }
        this.notifyViewAboutChanges();
    };

    public loadPosts = async (): Promise<void> => {
        if (!this.authHolder.isUserAuthorized() || this.isPostsLoading) return;
        this.isPostsLoading = true;
        this.postsErrorMessage = '';
        this.notifyViewAboutChanges();

        try {
            this.posts = await this.favoritesUseCase.getPosts();
            this.favoriteIds = new Set(this.posts.map((p) => p.id));
        } catch (e) {
            this.postsErrorMessage = e instanceof Error ? e.message : 'Не удалось загрузить избранное';
        } finally {
            this.isPostsLoading = false;
        }
        this.notifyViewAboutChanges();
    };

    private loadIds = async (): Promise<void> => {
        const userId = this.loadedForUserId;
        try {
            const ids = await this.favoritesUseCase.getIds();
            if (userId !== this.loadedForUserId) return;
            this.favoriteIds = new Set(ids);
        } catch {
        }
        this.notifyViewAboutChanges();
    };

    private setFavorite(postId: string, value: boolean): void {
        if (value) this.favoriteIds.add(postId);
        else this.favoriteIds.delete(postId);
    }

    private notifyViewAboutChanges = (): void => {
        this.views.forEach((view) => view.onViewModelChanged());
    };
}
