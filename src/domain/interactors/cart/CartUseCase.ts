import type CartRepository from '../../repository/cart/CartRepository.ts';
import type {CartItem} from '../../entity/cart/CartItem.ts';
import type {Order} from '../../entity/cart/Order.ts';

export default class CartUseCase {
    private readonly cartRepository: CartRepository;

    constructor(cartRepository: CartRepository) {
        this.cartRepository = cartRepository;
    }

    getItems(): Promise<CartItem[]> {
        return this.cartRepository.getItems();
    }

    getIds(): Promise<string[]> {
        return this.cartRepository.getIds();
    }

    add(postId: string): Promise<void> {
        return this.cartRepository.add(postId);
    }

    remove(postId: string): Promise<void> {
        return this.cartRepository.remove(postId);
    }

    checkout(): Promise<Order> {
        return this.cartRepository.checkout();
    }
}
