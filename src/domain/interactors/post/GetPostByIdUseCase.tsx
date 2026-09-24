import type {PostRepository} from "../../repository/post/PostRepository.tsx";
import type {Post} from "../../entity/post/models/Post.ts";

export default class GetPostByIdUseCase{
    private readonly postRepository: PostRepository;

    constructor(postRepository: PostRepository) {
        this.postRepository = postRepository;
    }

    async execute(id:string): Promise<Post>{
        return  this.postRepository.getById(id);
    }
}
