import AuthFakeApi from './data/auth/AuthFakeApi';
import AuthHolder from './domain/entity/auth/models/AuthHolder';
import LoginUseCase from './domain/interactors/auth/LoginUseCase';
import AuthViewModelImpl from './presentation/view-model/auth/AuthViewModelImpl';

// --- Post ---
import PostApiRepository from './data/post/PostApiRepository';
import GetAllPostUseCase from './domain/interactors/post/GetAllPostUseCase';
import GetPostByIdUseCase from './domain/interactors/post/GetPostByIdUseCase';
import CreatePostByIdUseCase from './domain/interactors/post/CreateNewPostUseCase';
import GetAllByUserIdUseCase from "./domain/interactors/post/GetAllByUserIdUseCase.tsx";

// --- Data ---
const authRepository = new AuthFakeApi();
const postRepository = new PostApiRepository();

// --- Domain ---
export const authHolder = new AuthHolder();          // синглтон — общий state
export const loginUseCase = new LoginUseCase(authRepository, authHolder);
export const getAllPostsUseCase = new GetAllPostUseCase(postRepository);
export const getPostByIdUseCase = new GetPostByIdUseCase(postRepository);
export const getPostsByUserUseCase = new GetAllByUserIdUseCase(postRepository);

export const createPostUsecase = new CreatePostByIdUseCase(postRepository);

// --- Presentation (синглтоны) ---
// AuthViewModel — один на приложение (кнопка в шапке)
export const authViewModel = new AuthViewModelImpl(loginUseCase, authHolder);
