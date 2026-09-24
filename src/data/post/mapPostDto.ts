import type {Post} from "../../domain/entity/post/models/Post.ts";

export interface PostDto {
    id: string;
    title: string;
    description: string;
    authorName: string;
    bookTitle: string;
    genreId: string;
    genreName?: string;
    isNew: boolean;
    condition?: string;
    isForever: boolean;
    isPostamat: boolean;
    city: string;
    street: string;
    houseNumber: string;
    ownerId: string;
    ownerName?: string;
    isActive?: boolean;
    coverUrl?: string | null;
    likeCount?: number;
}

export default function mapPostDto(item: PostDto): Post {
    return {
        id: item.id,
        title: item.title,
        description: item.description,
        authorName: item.authorName,
        bookTitle: item.bookTitle,
        genreId: item.genreId,
        genreName: item.genreName,
        isNew: item.isNew,
        condition: item.condition ?? (item.isNew ? 'Новое' : 'Б/у'),
        isForever: item.isForever,
        isPostamat: item.isPostamat,
        city: item.city,
        street: item.street,
        houseNumber: item.houseNumber,
        ownerId: item.ownerId,
        ownerName: item.ownerName,
        isActive: item.isActive ?? true,
        coverUrl: item.coverUrl ?? null,
        likeCount: item.likeCount ?? 0,
    };
}
