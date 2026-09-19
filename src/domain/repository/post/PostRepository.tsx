import type {Post} from "../../entity/post/models/Post.ts";

export  interface  PostRepository{
    getAll(): Promise<Post[]>;
    getById(id:string): Promise<Post>;

}
