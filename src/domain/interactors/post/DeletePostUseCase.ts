import type {PostRepository} from "../../repository/post/PostRepository.tsx";

/** Удаление объявления */
export default class DeletePostUseCase {
    private readonly postRepository: PostRepository;

    constructor(postRepository: PostRepository) {
        this.postRepository = postRepository;
    }

    execute(id: string): Promise<void> {
        return this.postRepository.delete(id);
    }
}
