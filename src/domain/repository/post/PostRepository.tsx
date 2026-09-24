import type {Post} from "../../entity/post/models/Post.ts";
import type {CreatePost} from "../../entity/post/models/CreatePost.ts";
import type {UpdatePost} from "../../entity/post/models/UpdatePost.ts";

export  interface  PostRepository{
    getAll(): Promise<Post[]>;
    getById(id:string): Promise<Post>;
    getListByUserId(id:string): Promise<Post[]>;
    getMy(): Promise<Post[]>;
    setActive(id: string, isActive: boolean): Promise<Post>;
    delete(id: string): Promise<void>;
    create(post: CreatePost): Promise<Post>;
    update(post: UpdatePost): Promise<Post>;
}
