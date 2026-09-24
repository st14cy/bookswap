
import type { Post } from '../../../../domain/entity/post/models/Post';
import type BaseViewModel from "../../BaseViewModel.tsx";
import type {BookSuggestion} from '../../../../domain/entity/book/BookSuggestion.ts';
import type {Genre} from '../../../../domain/entity/genre/Genre.ts';

export default interface PostFormViewModel extends BaseViewModel {
    title: string;
    authorName: string;
    description: string;
    bookTitle: string;
    genreId: string;
    isNew: boolean;
    condition: string;
    isForever: boolean;
    isPostamat: boolean;
    city: string;
    street: string;
    houseNumber: string;

    isLoading: boolean;
    isShowError: boolean;
    errorMessage: string;
    isEditMode: boolean;
    isSuccess: boolean;

    // --- редактирование: загрузка объявления ---
    isPostLoading: boolean;
    postLoadError: string;
    loadPost: () => Promise<void>;

    // --- жанры (из БД) ---
    genres: Genre[];
    isGenresLoading: boolean;
    genresError: string;
    loadGenres: () => Promise<void>;

    // --- автозаполнение книги и автора ---
    suggestBookTitles: (query: string, signal: AbortSignal) => Promise<BookSuggestion[]>;
    suggestAuthors: (query: string, signal: AbortSignal) => Promise<BookSuggestion[]>;
    onSelectBookSuggestion: (suggestion: BookSuggestion) => void;
    onSelectAuthorSuggestion: (suggestion: BookSuggestion) => void;

    onChangeTitle: (v: string) => void;
    onChangeAuthorName: (v: string) => void;
    onChangeDescription: (v: string) => void;
    onChangeBookTitle: (v: string) => void;
    onChangeGenreId: (v: string) => void;
    onChangeIsNew: (v: boolean) => void;
    onChangeCondition: (v: string) => void;
    onChangeIsForever: (v: boolean) => void;
    onChangeIsPostamat: (v: boolean) => void;
    onChangeCity: (v: string) => void;
    onChangeStreet: (v: string) => void;
    onChangeHouseNumber: (v: string) => void;

    initFromPost: (post: Post) => void;
    onSubmit: () => Promise<void>;
}