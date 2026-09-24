// --- Auth ---
import AuthApi from './data/auth/AuthApi';
import AuthorizedHttpClient from './data/http/AuthorizedHttpClient';
import AuthHolder from './domain/entity/auth/models/AuthHolder';
import LoginUseCase from './domain/interactors/auth/LoginUseCase';
import RegisterUseCase from './domain/interactors/auth/RegisterUseCase.tsx';
import LogoutUseCase from './domain/interactors/auth/LogoutUseCase.tsx';
import AuthViewModelImpl from './presentation/view-model/auth/AuthViewModelImpl';

// --- Post ---
import PostApiRepository from './data/post/PostApiRepository';
import GetAllPostUseCase from './domain/interactors/post/GetAllPostUseCase';
import GetPostByIdUseCase from './domain/interactors/post/GetPostByIdUseCase';
import GetAllByUserIdUseCase from "./domain/interactors/post/GetAllByUserIdUseCase.tsx";
import UpdatePostUseCase from "./domain/interactors/post/UpdatePostUseCase.tsx";
import CreatePostUseCase from "./domain/interactors/post/CreateNewPostUseCase";

// --- Book / Genre ---
import BookApiRepository from './data/book/BookApiRepository';
import GenreApiRepository from './data/genre/GenreApiRepository';
import SuggestBooksUseCase from './domain/interactors/book/SuggestBooksUseCase';
import GetGenresUseCase from './domain/interactors/genre/GetGenresUseCase';

// --- Domain state ---
export const authHolder = new AuthHolder();          // синглтон — общий state, восстанавливается из localStorage

// --- Data ---
const authRepository = new AuthApi();                // для работы без бэкенда: new AuthFakeApi()
export const httpClient = new AuthorizedHttpClient(authHolder, authRepository);
const postRepository = new PostApiRepository(httpClient);
const bookRepository = new BookApiRepository();
const genreRepository = new GenreApiRepository();

// --- Use cases ---
export const loginUseCase = new LoginUseCase(authRepository, authHolder);
export const registerUseCase = new RegisterUseCase(authRepository, authHolder);
export const logoutUseCase = new LogoutUseCase(authRepository, authHolder);

export const getAllPostsUseCase = new GetAllPostUseCase(postRepository);
export const getPostByIdUseCase = new GetPostByIdUseCase(postRepository);
export const getPostsByUserUseCase = new GetAllByUserIdUseCase(postRepository);
export const createPostUsecase = new CreatePostUseCase(postRepository);
export const updatePostUsecase = new UpdatePostUseCase(postRepository);

export const suggestBooksUseCase = new SuggestBooksUseCase(bookRepository);
export const getGenresUseCase = new GetGenresUseCase(genreRepository);

// --- View models ---
export const authViewModel = new AuthViewModelImpl(loginUseCase, registerUseCase, logoutUseCase, authHolder);
