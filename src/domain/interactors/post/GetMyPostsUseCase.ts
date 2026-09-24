import type {PostRepository} from "../../repository/post/PostRepository.tsx";
import type {Post} from "../../entity/post/models/Post.ts";

/** Объявления текущего авторизованного пользователя («Мои объявления») */
export default class GetMyPostsUseCase {
    private readonly postRepository: PostRepository;

    constructor(postRepository: PostRepository) {
        this.postRepository = postRepository;
    }

    execute(): Promise<Post[]> {
        return this.postRepository.getMy();
    }
}
