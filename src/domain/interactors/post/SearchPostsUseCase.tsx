import type {PostRepository} from "../../repository/post/PostRepository.tsx";
import type {Post} from "../../entity/post/models/Post.ts";

export default class SearchPostsUseCase {
    private readonly postRepository: PostRepository;

    constructor(postRepository: PostRepository) {
        this.postRepository = postRepository;
    }

    execute(query: string): Promise<Post[]> {
        const trimmed = query.trim();
        return trimmed ? this.postRepository.search(trimmed) : this.postRepository.getAll();
    }
}
