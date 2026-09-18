export interface Product {
    id: string;
    title: string;
    bookTitle: string;
    authorName: string;
    genreId: string;
    ownerId: string;
    description: string;
    city: string;
    street: string;
    houseNumber: string;
    isActive: boolean;
    isNew: boolean;
    isForever: boolean;
    isPostamat: boolean;
    startDate: string;
    endDate: string;
    viewsCount: number;
    likeCount: number;
    createdAt: string;
}