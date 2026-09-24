import type {Genre} from '../../entity/genre/Genre.ts';

export default interface GenreRepository {
    getAll(): Promise<Genre[]>;
}
