import type {BookSuggestion} from '../../entity/book/BookSuggestion.ts';

export default interface BookRepository {
    /** Книги по названию (опционально — только указанного автора) */
    suggestTitles(query: string, author?: string, signal?: AbortSignal): Promise<BookSuggestion[]>;

    /** Авторы по имени */
    suggestAuthors(query: string, signal?: AbortSignal): Promise<BookSuggestion[]>;
}
