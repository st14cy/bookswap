import type CartRepository from '../../domain/repository/cart/CartRepository.ts';
import type {CartItem} from '../../domain/entity/cart/CartItem.ts';
import type {Order} from '../../domain/entity/cart/Order.ts';
import type AuthorizedHttpClient from '../http/AuthorizedHttpClient.ts';
import mapPostDto, {type PostDto} from '../post/mapPostDto.ts';
import readErrorMessage from '../http/readErrorMessage.ts';

interface CartItemDto {
    addedAt: string;
    advertisement: PostDto;
}

export default class CartApiRepository implements CartRepository {
    private readonly baseUrl = `${import.meta.env.VITE_API_URL ?? ''}/api/Cart`;
    private readonly httpClient: AuthorizedHttpClient;

    constructor(httpClient: AuthorizedHttpClient) {
        this.httpClient = httpClient;
    }

    async getItems(): Promise<CartItem[]> {
        const response = await this.httpClient.fetch(this.baseUrl);
        if (!response.ok) throw new Error(await readErrorMessage(response));
        const data = (await response.json()) as CartItemDto[];
        return data.map((item) => ({addedAt: item.addedAt, post: mapPostDto(item.advertisement)}));
    }

    async getIds(): Promise<string[]> {
        const response = await this.httpClient.fetch(`${this.baseUrl}/ids`);
        if (!response.ok) throw new Error(await readErrorMessage(response));
        return (await response.json()) as string[];
    }

    async add(postId: string): Promise<void> {
        const response = await this.httpClient.fetch(`${this.baseUrl}/${postId}`, {method: 'POST'});
        if (!response.ok) throw new Error(await readErrorMessage(response));
    }

    async remove(postId: string): Promise<void> {
        const response = await this.httpClient.fetch(`${this.baseUrl}/${postId}`, {method: 'DELETE'});
        if (!response.ok) throw new Error(await readErrorMessage(response));
    }

    async checkout(): Promise<Order> {
        const response = await this.httpClient.fetch(`${this.baseUrl}/checkout`, {method: 'POST'});
        if (!response.ok) throw new Error(await readErrorMessage(response));
        return (await response.json()) as Order;
    }
}
