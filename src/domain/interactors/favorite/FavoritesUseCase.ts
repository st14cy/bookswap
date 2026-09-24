import type FavoriteRepository from '../../repository/favorite/FavoriteRepository.ts';
import type {Post} from '../../entity/post/models/Post.ts';

export default class FavoritesUseCase {
    private readonly favoriteRepository: FavoriteRepository;

    constructor(favoriteRepository: FavoriteRepository) {
        this.favoriteRepository = favoriteRepository;
    }

    getIds(): Promise<string[]> {
        return this.favoriteRepository.getIds();
    }

    getPosts(): Promise<Post[]> {
        return this.favoriteRepository.getAll();
    }

    add(postId: string): Promise<void> {
        return this.favoriteRepository.add(postId);
    }

    remove(postId: string): Promise<void> {
        return this.favoriteRepository.remove(postId);
    }
}
