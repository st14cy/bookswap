import type {PostRepository} from "../../repository/post/PostRepository.tsx";
import type {Post} from "../../entity/post/models/Post.ts";
import type {CreatePost} from "../../entity/post/models/CreatePost.ts";

export default class  CreatePostUseCase {
    constructor(private readonly postRepository: PostRepository) {}

    public async execute(post:CreatePost): Promise<Post> {
        const createPost =  this.postRepository.create(post);
        return  createPost;
    }
}