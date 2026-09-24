import type BookRepository from '../../domain/repository/book/BookRepository.ts';
import type {BookSuggestion} from '../../domain/entity/book/BookSuggestion.ts';

/** Подсказки из BooksController (api/Books/suggest), который ходит в OpenLibrary */
export default class BookApiRepository implements BookRepository {
    private readonly baseUrl = `${import.meta.env.VITE_API_URL ?? ''}/api/Books`;

    public suggestTitles(query: string, author?: string, signal?: AbortSignal): Promise<BookSuggestion[]> {
        const params = new URLSearchParams({q: query, type: 'title'});
        if (author) params.set('author', author);
        return this.request(params, signal);
    }

    public suggestAuthors(query: string, signal?: AbortSignal): Promise<BookSuggestion[]> {
        return this.request(new URLSearchParams({q: query, type: 'author'}), signal);
    }

    private async request(params: URLSearchParams, signal?: AbortSignal): Promise<BookSuggestion[]> {
        const response = await fetch(`${this.baseUrl}/suggest?${params.toString()}`, {signal});
        if (!response.ok) throw new Error(`Не удалось загрузить подсказки (${response.status})`);
        const data = (await response.json()) as BookSuggestion[];
        return Array.isArray(data) ? data : [];
    }
}
