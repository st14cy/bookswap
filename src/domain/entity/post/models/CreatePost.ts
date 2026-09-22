export interface CreatePostDto {
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
}