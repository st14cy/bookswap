import type {PostRepository} from "../../repository/post/PostRepository.tsx";
import type {Post} from "../../entity/post/models/Post.ts";

export default class ChangePostPublicationUseCase {
    private readonly postRepository: PostRepository;

    constructor(postRepository: PostRepository) {
        this.postRepository = postRepository;
    }

    unpublish(id: string): Promise<Post> {
        return this.postRepository.setActive(id, false);
    }

    publish(id: string): Promise<Post> {
        return this.postRepository.setActive(id, true);
    }
}
