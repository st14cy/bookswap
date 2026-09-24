import AuthApi from './data/auth/AuthApi';
import AuthorizedHttpClient from './data/http/AuthorizedHttpClient';
import AuthHolder from './domain/entity/auth/models/AuthHolder';
import LoginUseCase from './domain/interactors/auth/LoginUseCase';
import RegisterUseCase from './domain/interactors/auth/RegisterUseCase.tsx';
import LogoutUseCase from './domain/interactors/auth/LogoutUseCase.tsx';
import AuthViewModelImpl from './presentation/view-model/auth/AuthViewModelImpl';

import PostApiRepository from './data/post/PostApiRepository';
import GetAllPostUseCase from './domain/interactors/post/GetAllPostUseCase';
import GetPostByIdUseCase from './domain/interactors/post/GetPostByIdUseCase';
import GetAllByUserIdUseCase from "./domain/interactors/post/GetAllByUserIdUseCase.tsx";
import UpdatePostUseCase from "./domain/interactors/post/UpdatePostUseCase.tsx";
import CreatePostUseCase from "./domain/interactors/post/CreateNewPostUseCase";
import GetMyPostsUseCase from "./domain/interactors/post/GetMyPostsUseCase";
import ChangePostPublicationUseCase from "./domain/interactors/post/ChangePostPublicationUseCase";
import DeletePostUseCase from "./domain/interactors/post/DeletePostUseCase";

import BookApiRepository from './data/book/BookApiRepository';
import GenreApiRepository from './data/genre/GenreApiRepository';
import SuggestBooksUseCase from './domain/interactors/book/SuggestBooksUseCase';
import GetGenresUseCase from './domain/interactors/genre/GetGenresUseCase';

import FavoriteApiRepository from './data/favorite/FavoriteApiRepository';
import FavoritesUseCase from './domain/interactors/favorite/FavoritesUseCase';
import FavoritesViewModelImpl from './presentation/view-model/favorite/FavoritesViewModelImpl';

export const authHolder = new AuthHolder();

const authRepository = new AuthApi();
export const httpClient = new AuthorizedHttpClient(authHolder, authRepository);
const postRepository = new PostApiRepository(httpClient);
const bookRepository = new BookApiRepository();
const genreRepository = new GenreApiRepository();

export const loginUseCase = new LoginUseCase(authRepository, authHolder);
export const registerUseCase = new RegisterUseCase(authRepository, authHolder);
export const logoutUseCase = new LogoutUseCase(authRepository, authHolder);

export const getAllPostsUseCase = new GetAllPostUseCase(postRepository);
export const getPostByIdUseCase = new GetPostByIdUseCase(postRepository);
export const getPostsByUserUseCase = new GetAllByUserIdUseCase(postRepository);
export const getMyPostsUseCase = new GetMyPostsUseCase(postRepository);
export const changePostPublicationUseCase = new ChangePostPublicationUseCase(postRepository);
export const deletePostUseCase = new DeletePostUseCase(postRepository);
export const createPostUsecase = new CreatePostUseCase(postRepository);
export const updatePostUsecase = new UpdatePostUseCase(postRepository);

export const suggestBooksUseCase = new SuggestBooksUseCase(bookRepository);
export const getGenresUseCase = new GetGenresUseCase(genreRepository);

export const authViewModel = new AuthViewModelImpl(loginUseCase, registerUseCase, logoutUseCase, authHolder);

const favoriteRepository = new FavoriteApiRepository(httpClient);
export const favoritesUseCase = new FavoritesUseCase(favoriteRepository);
export const favoritesViewModel = new FavoritesViewModelImpl(favoritesUseCase, authHolder, authViewModel);
