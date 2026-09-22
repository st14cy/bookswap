import type PostDetailViewModel from './PostDetailViewModel';
import type BaseView from '../../../view/BaseView';
import GetPostByIdUseCase from '../../../../domain/interactors/post/GetPostByIdUseCase';
import type {Post} from "../../../../domain/entity/post/models/Post.ts";


export default class PostDetailViewModelImpl implements PostDetailViewModel {
    public post: Post | null;
    public isLoading: boolean;
    public errorMessage: string;
    public isShowError: boolean;

    private baseView?: BaseView;
    private getPostByIdUseCase: GetPostByIdUseCase;

    public constructor(getPostByIdUseCase: GetPostByIdUseCase) {
        this.post = null;
        this.isLoading = false;
        this.errorMessage = '';
        this.isShowError = false;

        this.getPostByIdUseCase = getPostByIdUseCase;
    }


    public attachView = (baseView: BaseView): void => {
        this.baseView = baseView;
    };

    public detachView = (): void => {
        this.baseView = undefined;
    };

    public onLoadPost = async (id: string): Promise<void> => {
        this.isLoading = true;
        this.isShowError = false;
        this.errorMessage = '';
        this.post = null;
        this.notifyViewAboutChanges();

        try {
            this.post = await this.getPostByIdUseCase.execute(id);
        } catch (e) {
            this.errorMessage = e instanceof Error ? e.message : 'Ошибка загрузки';
            this.isShowError = true;
        } finally {
            this.isLoading = false;
        }

        this.notifyViewAboutChanges();
    };

    private notifyViewAboutChanges = (): void => {
        if (this.baseView) {
            this.baseView.onViewModelChanged();
        }
    };
}
