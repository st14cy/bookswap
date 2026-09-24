import type BaseView from '../../view/BaseView';
import type {Post} from '../../../domain/entity/post/models/Post';

export default interface FavoritesViewModel {
    attachView(baseView: BaseView): void;
    detachView(baseView?: BaseView): void;

    count: number;
    isFavorite(postId: string): boolean;
    isPending(postId: string): boolean;
    toggle(postId: string): Promise<void>;
    actionErrorMessage: string;

    posts: Post[];
    isPostsLoading: boolean;
    postsErrorMessage: string;
    loadPosts(): Promise<void>;
}
