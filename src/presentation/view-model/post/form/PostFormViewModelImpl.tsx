import type PostFormViewModel from './PostFormViewModel';
import type BaseView from '../../../view/BaseView';
import type CreatePostUseCase from '../../../../domain/interactors/post/CreateNewPostUseCase';
import type UpdatePostUseCase from '../../../../domain/interactors/post/UpdatePostUseCase';
import type { Post } from '../../../../domain/entity/post/models/Post';
import type SuggestBooksUseCase from '../../../../domain/interactors/book/SuggestBooksUseCase';
import type GetGenresUseCase from '../../../../domain/interactors/genre/GetGenresUseCase';
import type { BookSuggestion } from '../../../../domain/entity/book/BookSuggestion';
import type { Genre } from '../../../../domain/entity/genre/Genre';
import type AuthHolder from '../../../../domain/entity/auth/models/AuthHolder';

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

    public isLoading = false;
    public isShowError = false;
    public errorMessage = '';
    public isSuccess = false;
    public isEditMode: boolean;

    public genres: Genre[] = [];
    public isGenresLoading = false;
    public genresError = '';

    private baseView?: BaseView;
    private readonly createPostUseCase: CreatePostUseCase;
    private readonly updatePostUseCase: UpdatePostUseCase;
    private readonly suggestBooksUseCase: SuggestBooksUseCase;
    private readonly getGenresUseCase: GetGenresUseCase;
    private readonly authHolder: AuthHolder;
    private readonly postId?: string;

    public constructor(
        createPostUseCase: CreatePostUseCase,
        updatePostUseCase: UpdatePostUseCase,
        suggestBooksUseCase: SuggestBooksUseCase,
        getGenresUseCase: GetGenresUseCase,
        authHolder: AuthHolder,
        postId?: string,
    ) {
        this.createPostUseCase = createPostUseCase;
        this.updatePostUseCase = updatePostUseCase;
        this.suggestBooksUseCase = suggestBooksUseCase;
        this.getGenresUseCase = getGenresUseCase;
        this.authHolder = authHolder;
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

    // === Жанры ===
    public loadGenres = async (): Promise<void> => {
        if (this.isGenresLoading) return;
        this.isGenresLoading = true;
        this.genresError = '';
        this.notifyViewAboutChanges();

        try {
            this.genres = await this.getGenresUseCase.execute();
        } catch (e) {
            this.genresError = e instanceof Error ? e.message : 'Не удалось загрузить жанры';
        } finally {
            this.isGenresLoading = false;
        }
        this.notifyViewAboutChanges();
    };

    // === Автозаполнение ===
    /** Книги по названию; если автор уже введён — только его книги */
    public suggestBookTitles = (query: string, signal: AbortSignal): Promise<BookSuggestion[]> =>
        this.suggestBooksUseCase.suggestTitles(query, this.authorName, signal);

    public suggestAuthors = (query: string, signal: AbortSignal): Promise<BookSuggestion[]> =>
        this.suggestBooksUseCase.suggestAuthors(query, signal);

    /** Выбрана книга: подставляем название, автора и (если пусто) заголовок объявления */
    public onSelectBookSuggestion = (s: BookSuggestion): void => {
        this.bookTitle = s.title;
        if (s.author) this.authorName = s.author;
        if (!this.title.trim()) this.title = s.title;
        this.notifyViewAboutChanges();
    };

    public onSelectAuthorSuggestion = (s: BookSuggestion): void => {
        this.authorName = s.author;
        this.notifyViewAboutChanges();
    };

    public onSubmit = async (): Promise<void> => {
        // Владелец объявления — текущий авторизованный пользователь
        const currentUser = this.authHolder.getUser();
        if (!currentUser) {
            this.errorMessage = 'Войдите в аккаунт, чтобы разместить объявление';
            this.isShowError = true;
            this.notifyViewAboutChanges();
            return;
        }

        if (!this.genreId) {
            this.errorMessage = 'Выберите жанр из списка';
            this.isShowError = true;
            this.notifyViewAboutChanges();
            return;
        }

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
            // Отдельного поля «Состояние (текст)» больше нет — текст берём из радиокнопки
            condition: this.isNew ? 'Новое' : 'Б/у',
            isForever: this.isForever,
            isPostamat: this.isPostamat,
            city: this.city,
            street: this.street,
            houseNumber: this.houseNumber,
            ownerId: currentUser.id,
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