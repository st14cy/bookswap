import type PostListViewModel from "./PostListViewModel.tsx";
import type {Post} from "../../../../domain/entity/post/models/Post.ts";
import type BaseView from "../../../view/BaseView.tsx";
import type GetAllPostUseCase from "../../../../domain/interactors/post/GetAllPostUseCase.tsx";

export default class PostListViewModelImpl implements PostListViewModel {
    public  posts: Post[];
    public isLoading: boolean;
    // @ts-ignore
    errorMessage: string | null;
    isShowError: boolean;

    private baseView?: BaseView;
    private  getAllPostUseCase:GetAllPostUseCase;


    public constructor(getAllPostUseCase: GetAllPostUseCase) {
        this.getAllPostUseCase=getAllPostUseCase;

        this.posts = [];
        this.isLoading = false;
        this.isShowError = false;
        this.errorMessage = '';

    }

    public  attachView(baseView: BaseView): void {
        this.baseView=baseView;
    }
    detachView(): void {
        this.baseView=undefined;
    }

    public onLoadPosts= async ():Promise<void>=>{
        this.isLoading=true;
        this.isShowError=false;
        this.errorMessage='';
        this.notifyViewAboutChanges();

        try{
            this.posts= await  this.getAllPostUseCase.execute();
        }
        catch(e){
            this.errorMessage= e instanceof  Error? e.message:'Load error';
        }
        finally {
            this.isLoading=false;
        }

        this.notifyViewAboutChanges();
    }


    private notifyViewAboutChanges = (): void => {
        if (this.baseView) {
            this.baseView.onViewModelChanged();
        }
    };
}
