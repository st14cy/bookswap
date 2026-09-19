import type {PostRepository} from "../../repository/post/PostRepository.tsx";
import type {Post} from "../../entity/post/models/Post.ts";

export default class GetAllPostUseCase{
    // @ts-ignore
    constructor(private readonly postRepository: PostRepository) {}

    async execute(): Promise<Post[]>{
        const  post = await this.postRepository.getAll()
        return  post;
    }
}
