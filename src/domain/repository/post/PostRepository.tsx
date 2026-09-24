import type {Post} from "../../entity/post/models/Post.ts";
import type {CreatePost} from "../../entity/post/models/CreatePost.ts";
import type {UpdatePost} from "../../entity/post/models/UpdatePost.ts";

export  interface  PostRepository{
    getAll(): Promise<Post[]>;
    getById(id:string): Promise<Post>;
    getListByUserId(id:string): Promise<Post[]>;
    /** Объявления текущего авторизованного пользователя */
    getMy(): Promise<Post[]>;
    /** isActive = false — снять с публикации (в архив), true — опубликовать снова */
    setActive(id: string, isActive: boolean): Promise<Post>;
    /** Удаление объявления (только владелец) */
    delete(id: string): Promise<void>;
    create(post: CreatePost): Promise<Post>;
    update(post: UpdatePost): Promise<Post>;
}
