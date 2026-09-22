import type PostFormViewModel from './PostFormViewModel';
import type BaseView from '../../../view/BaseView';
import type CreatePostUseCase from '../../../../domain/interactors/post/CreateNewPostUseCase';
import type UpdatePostUseCase from '../../../../domain/interactors/post/UpdatePostUseCase';
import type { Post } from '../../../../domain/entity/post/models/Post';

export default class PostFormViewModelImpl implements PostFormViewModel {
    public title = '';
    public authorName = '';
    public description = '';
    public bookTitle = '';
    public genreId = '';           // GUID как строка, "" = не заполнено
    public isNew = false;          // backend ждёт bool, не null
    public condition = '';
    public isForever = false;
    public isPostamat = false;
    public city = '';
    public street = '';
    public houseNumber = '';
    public ownerId = '';

    public isLoading = false;
    public isShowError = false;
    public errorMessage = '';
    public isSuccess = false;
    public isEditMode: boolean;

    private baseView?: BaseView;
    private readonly createPostUseCase: CreatePostUseCase;
    private readonly updatePostUseCase: UpdatePostUseCase;
    private readonly postId?: string;

    public constructor(
        createPostUseCase: CreatePostUseCase,
        updatePostUseCase: UpdatePostUseCase,
        postId?: string,
    ) {
        this.createPostUseCase = createPostUseCase;
        this.updatePostUseCase = updatePostUseCase;
        this.postId = postId;
        this.isEditMode = Boolean(postId);
    }

    public attachView = (baseView: BaseView): void => { this.baseView = baseView; };
    public detachView = (): void => { this.baseView = undefined; };

    public initFromPost = (post: Post): void => {
        this.title = post.title;
        this.authorName = post.authorName;
        this.description = post.description;
        this.bookTitle = post.bookTitle;
        this.genreId = post.genreId;
        this.isNew = post.isNew;
        this.condition = post.condition;
        this.isForever = post.isForever;
        this.isPostamat = post.isPostamat;
        this.city = post.city;
        this.street = post.street;
        this.houseNumber = post.houseNumber;
        this.ownerId = post.ownerId;
        this.notifyViewAboutChanges();
    };

    public onChangeTitle = (v: string): void => { this.title = v; this.notifyViewAboutChanges(); };
    public onChangeAuthorName = (v: string): void => { this.authorName = v; this.notifyViewAboutChanges(); };
    public onChangeDescription = (v: string): void => { this.description = v; this.notifyViewAboutChanges(); };
    public onChangeBookTitle = (v: string): void => { this.bookTitle = v; this.notifyViewAboutChanges(); };
    public onChangeGenreId = (v: string): void => { this.genreId = v; this.notifyViewAboutChanges(); };
    public onChangeIsNew = (v: boolean): void => { this.isNew = v; this.notifyViewAboutChanges(); };
    public onChangeCondition = (v: string): void => { this.condition = v; this.notifyViewAboutChanges(); };
    public onChangeIsForever = (v: boolean): void => { this.isForever = v; this.notifyViewAboutChanges(); };
    public onChangeIsPostamat = (v: boolean): void => { this.isPostamat = v; this.notifyViewAboutChanges(); };
    public onChangeCity = (v: string): void => { this.city = v; this.notifyViewAboutChanges(); };
    public onChangeStreet = (v: string): void => { this.street = v; this.notifyViewAboutChanges(); };
    public onChangeHouseNumber = (v: string): void => { this.houseNumber = v; this.notifyViewAboutChanges(); };
    public onChangeOwnerId = (v: string): void => { this.ownerId = v; this.notifyViewAboutChanges(); };

    public onSubmit = async (): Promise<void> => {
        this.isLoading = true;
        this.isShowError = false;
        this.errorMessage = '';
        this.notifyViewAboutChanges();

        const dto = {
            title: this.title,
            authorName: this.authorName,
            description: this.description,
            bookTitle: this.bookTitle,
            genreId: this.genreId,
            isNew: this.isNew,
            condition: this.condition,
            isForever: this.isForever,
            isPostamat: this.isPostamat,
            city: this.city,
            street: this.street,
            houseNumber: this.houseNumber,
            ownerId: this.ownerId,
        };

        try {
            if (this.isEditMode && this.postId) {
                await this.updatePostUseCase.execute({ id: this.postId, ...dto });
            } else {
                await this.createPostUseCase.execute(dto);
            }
            this.isSuccess = true;
        } catch (e) {
            this.errorMessage = e instanceof Error ? e.message : 'Ошибка сохранения';
            this.isShowError = true;
        } finally {
            this.isLoading = false;
        }

        this.notifyViewAboutChanges();
    };

    private notifyViewAboutChanges = (): void => {
        this.baseView?.onViewModelChanged();
    };
}