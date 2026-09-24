import type {PostRepository} from "../../repository/post/PostRepository.tsx";
import type {Post} from "../../entity/post/models/Post.ts";

export default class GetMyPostsUseCase {
    private readonly postRepository: PostRepository;

    constructor(postRepository: PostRepository) {
        this.postRepository = postRepository;
    }

    execute(): Promise<Post[]> {
        return this.postRepository.getMy();
    }
}
