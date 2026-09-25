import type CartViewModel from './CartViewModel';
import type BaseView from '../../view/BaseView';
import type {CartItem} from '../../../domain/entity/cart/CartItem';
import type {Order} from '../../../domain/entity/cart/Order';
import type CartUseCase from '../../../domain/interactors/cart/CartUseCase';
import type AuthHolder from '../../../domain/entity/auth/models/AuthHolder';
import type AuthListener from '../../../domain/entity/auth/models/AuthListener';
import type AuthViewModel from '../auth/AuthViewModel';

export default class CartViewModelImpl implements CartViewModel, AuthListener {
    public items: CartItem[] = [];
    public isItemsLoading = false;
    public itemsErrorMessage = '';
    public actionErrorMessage = '';
    public actionErrorPostId: string | null = null;
    public isCheckingOut = false;
    public checkoutErrorMessage = '';
    public lastOrder: Order | null = null;

    private cartIds = new Set<string>();
    private pendingIds = new Set<string>();
    private views = new Set<BaseView>();
    private loadedForUserId: string | null = null;

    private readonly cartUseCase: CartUseCase;
    private readonly authHolder: AuthHolder;
    private readonly authViewModel: AuthViewModel;

    public constructor(cartUseCase: CartUseCase, authHolder: AuthHolder, authViewModel: AuthViewModel) {
        this.cartUseCase = cartUseCase;
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
        return this.cartIds.size;
    }

    public isInCart = (postId: string): boolean => this.cartIds.has(postId);
    public isPending = (postId: string): boolean => this.pendingIds.has(postId);

    public onAuthChanged = (): void => {
        const userId = this.authHolder.getUser()?.id ?? null;
        if (userId === this.loadedForUserId) return;

        this.loadedForUserId = userId;
        this.cartIds.clear();
        this.items = [];
        this.lastOrder = null;
        this.resetErrors();
        this.notifyViewAboutChanges();

        if (userId) void this.loadIds();
    };

    public add = async (postId: string): Promise<void> => {
        if (!this.authHolder.isUserAuthorized()) {
            this.authViewModel.openAuthModal();
            return;
        }
        if (this.pendingIds.has(postId) || this.cartIds.has(postId)) return;

        this.pendingIds.add(postId);
        this.resetErrors();
        this.lastOrder = null;
        this.notifyViewAboutChanges();

        try {
            await this.cartUseCase.add(postId);
            this.cartIds.add(postId);
        } catch (e) {
            this.actionErrorMessage = e instanceof Error ? e.message : 'Не удалось добавить в корзину';
            this.actionErrorPostId = postId;
        } finally {
            this.pendingIds.delete(postId);
        }
        this.notifyViewAboutChanges();
    };

    public remove = async (postId: string): Promise<void> => {
        if (this.pendingIds.has(postId)) return;

        this.pendingIds.add(postId);
        this.resetErrors();
        this.notifyViewAboutChanges();

        try {
            await this.cartUseCase.remove(postId);
            this.cartIds.delete(postId);
            this.items = this.items.filter((item) => item.post.id !== postId);
        } catch (e) {
            this.actionErrorMessage = e instanceof Error ? e.message : 'Не удалось убрать из корзины';
            this.actionErrorPostId = postId;
        } finally {
            this.pendingIds.delete(postId);
        }
        this.notifyViewAboutChanges();
    };

    public loadItems = async (): Promise<void> => {
        if (!this.authHolder.isUserAuthorized() || this.isItemsLoading) return;
        this.isItemsLoading = true;
        this.itemsErrorMessage = '';
        this.notifyViewAboutChanges();

        try {
            this.items = await this.cartUseCase.getItems();
            this.cartIds = new Set(this.items.map((item) => item.post.id));
        } catch (e) {
            this.itemsErrorMessage = e instanceof Error ? e.message : 'Не удалось загрузить корзину';
        } finally {
            this.isItemsLoading = false;
        }
        this.notifyViewAboutChanges();
    };

    public checkout = async (): Promise<void> => {
        if (this.isCheckingOut || this.items.length === 0) return;
        this.isCheckingOut = true;
        this.resetErrors();
        this.notifyViewAboutChanges();

        try {
            this.lastOrder = await this.cartUseCase.checkout();
            this.items = [];
            this.cartIds.clear();
        } catch (e) {
            this.checkoutErrorMessage = e instanceof Error ? e.message : 'Не удалось оформить заказ';
        } finally {
            this.isCheckingOut = false;
        }
        this.notifyViewAboutChanges();
    };

    private loadIds = async (): Promise<void> => {
        const userId = this.loadedForUserId;
        try {
            const ids = await this.cartUseCase.getIds();
            if (userId !== this.loadedForUserId) return;
            this.cartIds = new Set(ids);
        } catch {
            return;
        }
        this.notifyViewAboutChanges();
    };

    private resetErrors(): void {
        this.actionErrorMessage = '';
        this.actionErrorPostId = null;
        this.checkoutErrorMessage = '';
    }

    private notifyViewAboutChanges = (): void => {
        this.views.forEach((view) => view.onViewModelChanged());
    };
}
