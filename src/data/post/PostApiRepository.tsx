import type {Post} from "../../domain/entity/post/models/Post.ts";

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
