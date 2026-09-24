import type GenreRepository from '../../repository/genre/GenreRepository.ts';
import type {Genre} from '../../entity/genre/Genre.ts';

export default class GetGenresUseCase {
    private readonly genreRepository: GenreRepository;

    public constructor(genreRepository: GenreRepository) {
        this.genreRepository = genreRepository;
    }

    public execute(): Promise<Genre[]> {
        return this.genreRepository.getAll();
    }
}
