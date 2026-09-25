import type {CartItem} from '../../entity/cart/CartItem.ts';
import type {Order} from '../../entity/cart/Order.ts';

export default interface CartRepository {
    getItems(): Promise<CartItem[]>;
    getIds(): Promise<string[]>;
    add(postId: string): Promise<void>;
    remove(postId: string): Promise<void>;
    checkout(): Promise<Order>;
}
