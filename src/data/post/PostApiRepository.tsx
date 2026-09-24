import type {Post} from "../../domain/entity/post/models/Post.ts";

import type {UpdatePost} from "../../domain/entity/post/models/UpdatePost.ts";
import type {CreatePost} from "../../domain/entity/post/models/CreatePost.ts";
import type AuthorizedHttpClient from "../http/AuthorizedHttpClient.ts";

export default class PostApiRepository{
    /*private readonly baseUrl=import.meta.env.DEV
        ? ''
        : (import.meta.env.VITE_API_URL ?? '');*/
    private readonly baseUrl=import.meta.env.VITE_API_URL;
    private readonly httpClient: AuthorizedHttpClient;

    constructor(httpClient: AuthorizedHttpClient) {
        this.httpClient = httpClient;
    }

    async  getAll():Promise<Post[]>{
        const response = await  fetch(`${this.baseUrl}/api/Advertisement/getAll`)
        if(!response.ok) throw  new Error(`Failed to fetch posts:${response.status}`);
        const  data = await response.json();
        return data.map(this.mapToEntity)
    }
    async  getById(id: string):Promise<Post>{
        const  response = await fetch(`${this.baseUrl}/api/Advertisement/getById/${id}`)
        if(!response.ok) throw new Error(`Failed to fetch one post:${response.status}`);
        const data = await  response.json();
        return  this.mapToEntity(data);
    }

    async  getListByUserId(id: string):Promise<Post[]>{
        const  response = await fetch(`${this.baseUrl}/api/Advertisement/getByUser/${id}`)
        if(!response.ok) throw new Error(`Failed to fetch user posts:${response.status}`);
        const data = await  response.json();
        return data.map(this.mapToEntity);
    }

    /** Объявления текущего пользователя: запрос с токеном, пользователь определяется на сервере */
    async getMy(): Promise<Post[]> {
        const response = await this.httpClient.fetch(`${this.baseUrl}/api/Advertisement/my`);
        if (response.status === 401) throw new Error('Войдите в аккаунт, чтобы увидеть свои объявления');
        if (!response.ok) throw new Error(`Не удалось загрузить объявления (${response.status})`);
        const data = await response.json();
        return data.map(this.mapToEntity);
    }
    /** Снять с публикации / опубликовать снова (только владелец, запрос с токеном) */
    async setActive(id: string, isActive: boolean): Promise<Post> {
        const action = isActive ? 'publish' : 'unpublish';
        const response = await this.httpClient.fetch(`${this.baseUrl}/api/Advertisement/${id}/${action}`, {
            method: 'PATCH',
        });
        if (!response.ok) {
            let message = isActive ? 'Не удалось опубликовать объявление' : 'Не удалось снять объявление с публикации';
            try {
                const data = await response.json();
                if (data && typeof data.message === 'string') message = data.message;
            } catch {
                // тело ответа не JSON — оставляем общее сообщение
            }
            throw new Error(message);
        }
        return this.mapToEntity(await response.json());
    }

    /** Удаление (только владелец, запрос с токеном). Сервер отвечает 204 без тела */
    async delete(id: string): Promise<void> {
        const response = await this.httpClient.fetch(`${this.baseUrl}/api/Advertisement/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            let message = 'Не удалось удалить объявление';
            try {
                const data = await response.json();
                if (data && typeof data.message === 'string') message = data.message;
            } catch {
                // тело ответа не JSON — оставляем общее сообщение
            }
            throw new Error(message);
        }
    }

    async create(post:CreatePost): Promise<Post>{
        const res = await this.httpClient.fetch(`${this.baseUrl}/api/Advertisement/createAdvertisement`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.mapDtoToRequest(post)),
        });
        if (!res.ok) throw new Error('Не удалось создать объявление');
        return this.mapToEntity(await res.json());
    }
    /** Редактирование (только владелец, запрос с токеном) */
    public async update(dto: UpdatePost): Promise<Post> {
        const res = await this.httpClient.fetch(`${this.baseUrl}/api/Advertisement/posts/${dto.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.mapUpdateToRequest(dto)),
        });
        if (!res.ok) {
            let message = 'Не удалось обновить объявление';
            try {
                const data = await res.json();
                if (data && typeof data.message === 'string') message = data.message;
            } catch {
                // тело ответа не JSON — оставляем общее сообщение
            }
            throw new Error(message);
        }
        return this.mapToEntity(await res.json());
    }

    /** Поля UpdateAdvertisementRequestDto на бэкенде (автор там называется author) */
    private mapUpdateToRequest(dto: UpdatePost) {
        return {
            title: dto.title,
            bookTitle: dto.bookTitle,
            description: dto.description,
            author: dto.authorName,
            genreId: dto.genreId || null,
            isNew: dto.isNew,
            isForever: dto.isForever,
            isPostamat: dto.isPostamat,
            city: dto.city,
            street: dto.street,
            houseNumber: dto.houseNumber,
            // пустая строка — сервер уберёт обложку
            coverUrl: dto.coverUrl ?? '',
        };
    }







    private mapDtoToRequest(dto: CreatePost) {
        const body: Record<string, unknown> = {
            title: dto.title,
            bookTitle: dto.bookTitle,
            description: dto.description,
            authorName: dto.authorName,
            condition: dto.condition,
            isNew: dto.isNew,
            isForever: dto.isForever,
            isPostamat: dto.isPostamat,
            city: dto.city,
            genreId: dto.genreId,

            street: dto.street,
            houseNumber: dto.houseNumber,
            coverUrl: dto.coverUrl ?? null,
        };

        if (dto.ownerId && dto.ownerId.trim().length > 0) {
            body.ownerId = dto.ownerId;
        }

        return body;
    }

    private mapToEntity(item: any): Post {
        return {
            id: item.id,
            title: item.title,
            description: item.description,
            authorName: item.authorName,
            bookTitle: item.bookTitle,
            genreId: item.genreId,
            genreName: item.genreName,
            isNew: item.isNew,
            condition: item.condition ?? (item.isNew ? 'Новое' : 'Б/у'),
            isForever: item.isForever,
            isPostamat: item.isPostamat,
            city: item.city,
            street: item.street,
            houseNumber: item.houseNumber,
            ownerId: item.ownerId,
            ownerName: item.ownerName,
            isActive: item.isActive ?? true,
            coverUrl: item.coverUrl ?? null,
        };
    }
}
