import type {Product} from "./types/advertisement.ts";

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