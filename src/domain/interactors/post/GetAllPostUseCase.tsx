import type {PostRepository} from "../../repository/post/PostRepository.tsx";
import type {Post} from "../../entity/post/models/Post.ts";

export default class GetAllPostUseCase{
    private readonly postRepository: PostRepository;

    constructor(postRepository: PostRepository) {
        this.postRepository = postRepository;
    }

    async execute(): Promise<Post[]>{
        const  post = await this.postRepository.getAll()
        return  post;
    }
}
