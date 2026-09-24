import type {BookSuggestion} from '../../entity/book/BookSuggestion.ts';

export default interface BookRepository {
    suggestTitles(query: string, author?: string, signal?: AbortSignal): Promise<BookSuggestion[]>;

    suggestAuthors(query: string, signal?: AbortSignal): Promise<BookSuggestion[]>;
}
