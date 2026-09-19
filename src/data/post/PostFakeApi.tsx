import type {PostApiRepository} from "./PostApiRepository.tsx";
import type {Post} from "../../domain/entity/post/models/Post.ts";

export  class PostFakeApi implements  PostApiRepository{
    private readonly posts: Post[] = [
        {
            id: '1',
            title: 'Обмен книгами в центре',
            description: 'Отдам книгу в хорошем состоянии, самовывоз',
            authorName: 'Иван Иванов',
            bookTitle: 'Преступление и наказание',
            genreId: 'genre-1',
            genreName: 'Классика',
            isNew: false,
            isForever: true,
            isPostamat: false,
            city: 'Москва',
            street: 'Тверская',
            houseNumber: '12',
            ownerId: 'user-1',
            ownerName: 'Иван Иванов',
        },
        {
            id: '2',
            title: 'Новая книга в упаковке',
            description: 'Продаю/меняю, не подошла по жанру',
            authorName: 'Анна Смирнова',
            bookTitle: 'Мастер и Маргарита',
            genreId: 'genre-2',
            genreName: 'Роман',
            isNew: true,
            isForever: false,
            isPostamat: true,
            city: 'Санкт-Петербург',
            street: 'Невский проспект',
            houseNumber: '45',
            ownerId: 'user-2',
            ownerName: 'Анна Смирнова',
        },
        {
            id: '3',
            title: 'Детектив на обмен',
            description: 'Могу отправить почтой или положить в постамат',
            authorName: 'Пётр Кузнецов',
            bookTitle: 'Убийство в Восточном экспрессе',
            genreId: 'genre-3',
            genreName: 'Детектив',
            isNew: false,
            isForever: false,
            isPostamat: true,
            city: 'Казань',
            street: 'Баумана',
            houseNumber: '7',
            ownerId: 'user-3',
            ownerName: 'Пётр Кузнецов',
        },
        {
            id: '4',
            title: 'Фантастика для ценителей',
            description: 'Обменяю на что-нибудь из фэнтези',
            authorName: 'Елена Попова',
            bookTitle: 'Дюна',
            genreId: 'genre-4',
            genreName: 'Фантастика',
            isNew: false,
            isForever: true,
            isPostamat: false,
            city: 'Новосибирск',
            street: 'Красный проспект',
            houseNumber: '100',
            ownerId: 'user-4',
            ownerName: 'Елена Попова',
        },
        {
            id: '5',
            title: 'Подарочное издание',
            description: 'Совершенно новая, в плёнке. Обмен или даром',
            authorName: 'Сергей Васильев',
            bookTitle: 'Гарри Поттер и философский камень',
            genreId: 'genre-5',
            genreName: 'Фэнтези',
            isNew: true,
            isForever: true,
            isPostamat: true,
            city: 'Екатеринбург',
            street: 'Ленина',
            houseNumber: '24',
            ownerId: 'user-5',
            ownerName: 'Сергей Васильев',
        },
    ];

    async getAll(): Promise<Post[]> {
        await new Promise((r) => setTimeout(r, 300));
        return this.posts;
    }

    async getById(id: string): Promise<Post> {
        await new Promise((r) => setTimeout(r, 200));
        const found = this.posts.find((p) => p.id === id);
        if (!found) throw new Error(`Post ${id} not found`);
        return found;
    }
}
