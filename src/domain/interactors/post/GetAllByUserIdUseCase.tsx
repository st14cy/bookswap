import type {PostRepository} from "../../repository/post/PostRepository.tsx";
import type {Post} from "../../entity/post/models/Post.ts";

export  default class GetAllByUserIdUseCase {
    // @ts-ignore
    constructor(private  readonly postRepository: PostRepository) {}

    async execute(id:string): Promise<Post[]>{
        return  this.postRepository.getListByUserId(id);
    }
}