import type FavoriteRepository from '../../domain/repository/favorite/FavoriteRepository.ts';
import type {Post} from '../../domain/entity/post/models/Post.ts';
import type AuthorizedHttpClient from '../http/AuthorizedHttpClient.ts';
import mapPostDto from '../post/mapPostDto.ts';
import readErrorMessage from '../http/readErrorMessage.ts';

export default class FavoriteApiRepository implements FavoriteRepository {
    private readonly baseUrl = `${import.meta.env.VITE_API_URL ?? ''}/api/Favorite`;
    private readonly httpClient: AuthorizedHttpClient;

    constructor(httpClient: AuthorizedHttpClient) {
        this.httpClient = httpClient;
    }

    async getIds(): Promise<string[]> {
        const response = await this.httpClient.fetch(`${this.baseUrl}/ids`);
        if (!response.ok) throw new Error(await readErrorMessage(response));
        return (await response.json()) as string[];
    }

    async getAll(): Promise<Post[]> {
        const response = await this.httpClient.fetch(this.baseUrl);
        if (!response.ok) throw new Error(await readErrorMessage(response));
        const data = await response.json();
        return data.map(mapPostDto);
    }

    async add(postId: string): Promise<void> {
        const response = await this.httpClient.fetch(`${this.baseUrl}/${postId}`, {method: 'POST'});
        if (!response.ok) throw new Error(await readErrorMessage(response));
    }

    async remove(postId: string): Promise<void> {
        const response = await this.httpClient.fetch(`${this.baseUrl}/${postId}`, {method: 'DELETE'});
        if (!response.ok) throw new Error(await readErrorMessage(response));
    }
}
