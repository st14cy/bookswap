import type {Post} from '../../entity/post/models/Post.ts';

export default interface FavoriteRepository {
    getIds(): Promise<string[]>;
    getAll(): Promise<Post[]>;
    add(postId: string): Promise<void>;
    remove(postId: string): Promise<void>;
}
