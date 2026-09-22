import type {Post} from "../../domain/entity/post/models/Post.ts";
import type CreatePost from "../../domain/entity/post/models/CreatePost.ts";
import type {UpdatePost} from "../../domain/entity/post/models/UpdatePost.ts";

export default class PostApiRepository{
    /*private readonly baseUrl=import.meta.env.DEV
        ? ''
        : (import.meta.env.VITE_API_URL ?? '');*/
    private readonly baseUrl=import.meta.env.VITE_API_URL;

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


    async create(post:CreatePost): Promise<Post>{
        const res = await fetch(`${this.baseUrl}/api/Advertisement/createAdvertisement`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.mapDtoToRequest(post)),
        });
        if (!res.ok) throw new Error('Не удалось создать объявление');
        return this.mapToEntity(await res.json());
    }

    public async update(dto: UpdatePost): Promise<Post> {
        const res = await fetch(`${this.baseUrl}/api/Advertisement/posts/${dto.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.mapDtoToRequest(dto)),
        });
        if (!res.ok) throw new Error('Не удалось обновить объявление');
        return this.mapToEntity(await res.json());
    }

    private mapDtoToRequest(dto: CreatePost) {
        const body: Record<string, unknown> = {
            title: dto.title,
            bookTitle: dto.bookTitle,
            description: dto.description,
            authorName: dto.authorName,
            condition: dto.condition,
            isNew:  true,
            isForever:  true,
            isPostamat:  true,
            city: dto.city,
            sellerId: "446b6c74-9d7d-4500-86b6-92b02867b27c",
            genreId: "2abe7c67-6991-4e0c-ba6c-33152842e5ce",

            street: dto.street,
            houseNumber: dto.houseNumber,
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
            isForever: item.isForever,
            isPostamat: item.isPostamat,
            city: item.city,
            street: item.street,
            houseNumber: item.houseNumber,
            ownerId: item.ownerId,
            ownerName: item.ownerName
        };
    }
}
