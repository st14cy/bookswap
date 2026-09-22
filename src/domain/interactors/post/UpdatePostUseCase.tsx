import type {PostRepository} from "../../repository/post/PostRepository.tsx";
import type {UpdatePost} from "../../entity/post/models/UpdatePost.ts";
import type {Post} from "../../entity/post/models/Post.ts";

export default class  UpdatePostUseCase {
    constructor(private readonly postRepository: PostRepository) {}

    public async execute(post:UpdatePost): Promise<Post> {
        const updatePost =  this.postRepository.update(post);
        return updatePost;
    }
}