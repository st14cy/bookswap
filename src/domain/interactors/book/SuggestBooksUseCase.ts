import type BookRepository from '../../repository/book/BookRepository.ts';
import type {BookSuggestion} from '../../entity/book/BookSuggestion.ts';

export default class SuggestBooksUseCase {
    private readonly bookRepository: BookRepository;

    public constructor(bookRepository: BookRepository) {
        this.bookRepository = bookRepository;
    }

    public suggestTitles(query: string, author?: string, signal?: AbortSignal): Promise<BookSuggestion[]> {
        return this.bookRepository.suggestTitles(query.trim(), author?.trim() || undefined, signal);
    }

    public suggestAuthors(query: string, signal?: AbortSignal): Promise<BookSuggestion[]> {
        return this.bookRepository.suggestAuthors(query.trim(), signal);
    }
}
