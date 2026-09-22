
import type { Post } from '../../../../domain/entity/post/models/Post';
import type BaseViewModel from "../../BaseViewModel.tsx";

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
    ownerId: string;

    isLoading: boolean;
    isShowError: boolean;
    errorMessage: string;
    isEditMode: boolean;
    isSuccess: boolean;

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
    onChangeOwnerId: (v: string) => void;

    initFromPost: (post: Post) => void;
    onSubmit: () => Promise<void>;
}