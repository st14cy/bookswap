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

const apiUrl = import.meta.env.DEV
    ? ''
    : (import.meta.env.VITE_API_URL ?? '');

export async function getAllProducts(
    signal?: AbortSignal,
): Promise<Product[]> {
    const response = await fetch(`${apiUrl}/api/Advertisement/getAll`, {
        signal,
    });

    if (!response.ok) {
        throw new Error(`Не удалось загрузить товары: ${response.status}`);
    }

    return response.json();
}

export async function getProductById(
    id: string,
    signal?: AbortSignal,
): Promise<Product> {
    const response = await fetch(`${apiUrl}/api/Advertisement/getById/${id}`, {
        signal,
    });

    if (!response.ok) {
        throw new Error(`Не удалось загрузить товар: ${response.status}`);
    }

    return response.json();
}