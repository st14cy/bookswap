import type {Post} from '../post/models/Post.ts';

export interface CartItem {
    addedAt: string;
    post: Post;
}
