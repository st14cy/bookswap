export interface Post {
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
    ownerId: string;
    ownerName?: string;
    genreName?: string;
    /** false — снято с публикации (в архиве) */
    isActive: boolean;
}