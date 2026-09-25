import type BaseView from '../../view/BaseView';
import type {CartItem} from '../../../domain/entity/cart/CartItem';
import type {Order} from '../../../domain/entity/cart/Order';

export default interface CartViewModel {
    attachView(baseView: BaseView): void;
    detachView(baseView?: BaseView): void;

    count: number;
    isInCart(postId: string): boolean;
    isPending(postId: string): boolean;
    add(postId: string): Promise<void>;
    remove(postId: string): Promise<void>;
    actionErrorMessage: string;
    actionErrorPostId: string | null;

    items: CartItem[];
    isItemsLoading: boolean;
    itemsErrorMessage: string;
    loadItems(): Promise<void>;

    isCheckingOut: boolean;
    checkoutErrorMessage: string;
    lastOrder: Order | null;
    checkout(): Promise<void>;
}
