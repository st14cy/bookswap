import type {Post} from "../../../../domain/entity/post/models/Post.ts";
import type BaseViewModel from "../../BaseViewModel.tsx";

export default interface PostListViewModel extends BaseViewModel{
    posts: Post[];
    onLoadPosts:()=>Promise<void>;
}
