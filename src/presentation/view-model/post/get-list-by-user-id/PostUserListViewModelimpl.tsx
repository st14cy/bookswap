// PostUserListViewModelImpl.tsx
import type {Post} from "../../../../domain/entity/post/models/Post.ts";
import type {PostUserListViewModel} from "./PostUserListViewModel.tsx";
import GetAllByUserIdUseCase from "../../../../domain/interactors/post/GetAllByUserIdUseCase.tsx";
import type BaseView from "../../../view/BaseView.tsx";

export default class PostUserListViewModelImpl implements PostUserListViewModel {
    public posts: Post[] = [];
    public isLoading = false;
    public isShowError = false;
    public errorMessage = '';

    private baseView?: BaseView;


    public constructor(
        // @ts-ignore
        private readonly getPostsByUserUseCase: GetAllByUserIdUseCase,
        // @ts-ignore
        private readonly userId: string,
    ) {}

    public attachView = (v: BaseView) => { this.baseView = v; };
    public detachView = () => { this.baseView = undefined; };

    public onLoadPosts = async (): Promise<void> => {
        this.isLoading = true;
        this.isShowError = false;
        this.errorMessage = '';
        this.notifyViewAboutChanges();

        try {
            this.posts = await this.getPostsByUserUseCase.execute(this.userId);
        } catch (e) {
            this.errorMessage = e instanceof Error ? e.message : 'Load error';
            this.isShowError = true;
        } finally {
            this.isLoading = false;
        }
        this.notifyViewAboutChanges();
    };

    private notifyViewAboutChanges = () => {
        this.baseView?.onViewModelChanged();
    };
}