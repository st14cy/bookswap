/** Подсказка автозаполнения (книга или автор) — соответствует BookSuggestionDto на бэкенде */
export interface BookSuggestion {
    title: string;
    author: string;
    year?: string | null;
    coverUrl?: string | null;
}
