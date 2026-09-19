import type {Post} from "../../../../domain/entity/post/models/Post.ts";
import type BaseViewModel from "../../BaseViewModel.tsx";

export default interface PostDetailViewModel extends BaseViewModel {
    post: Post | null;
    onLoadPost: (id: string) => Promise<void>;
}
