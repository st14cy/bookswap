export interface UpdatePost {
    id: string;
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
    /** Ссылка на обложку, null — убрать обложку */
    coverUrl?: string | null;
}