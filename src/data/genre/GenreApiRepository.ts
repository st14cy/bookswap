import type GenreRepository from '../../domain/repository/genre/GenreRepository.ts';
import type {Genre} from '../../domain/entity/genre/Genre.ts';

/** Жанры из БД (api/Genre/getAll). Список кешируется — жанры меняются редко */
export default class GenreApiRepository implements GenreRepository {
    private readonly baseUrl = `${import.meta.env.VITE_API_URL ?? ''}/api/Genre`;
    private cache: Promise<Genre[]> | null = null;

    public getAll(): Promise<Genre[]> {
        if (!this.cache) {
            this.cache = this.load().catch((e) => {
                this.cache = null; // при ошибке даём попробовать ещё раз
                throw e;
            });
        }
        return this.cache;
    }

    private async load(): Promise<Genre[]> {
        let response: Response;
        try {
            response = await fetch(`${this.baseUrl}/getAll`);
        } catch {
            throw new Error('Сервер недоступен — не удалось загрузить жанры');
        }
        if (!response.ok) throw new Error(`Не удалось загрузить жанры (${response.status})`);
        const data = (await response.json()) as Genre[];
        return data.map((g) => ({id: g.id, name: g.name}));
    }
}
