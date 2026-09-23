import SellerProfile from "../../pages/PostDetailsPage/components/SellerProfile.tsx";
import PostsPage from "../../pages/PostListPage/PostListPage.tsx";
import PostDetailsPage from "../../pages/PostDetailsPage/PostDetailsPage.tsx";
import AddPostPage from "../../pages/AddPostPage/AddPostPage.tsx";
import UsersPostPage from "../../pages/UsersPostPage/UsersPostPage.tsx";

export const ROUTES = {
    mainCatalog: {
        path: '/',
        component: PostsPage,
        title: 'Каталог товаров',
    },
    product: {
        path: '/post/:postId',
        component: PostDetailsPage,
        title: 'Информация о товаре',
    },
    addPost: {
        path: '/posts/new',
        component: AddPostPage,
        title: 'Новое объявление',
        requiresAuth: true },
    usersPosts: {
        path: 'profile',
        component: UsersPostPage,
        title: 'Мои объявления',
        requiresAuth: true },



    seller: {
        path: '/seller',
        component: SellerProfile,
        title: 'Профиль',
    },
} as const;

export type RouteKeys = keyof typeof ROUTES;

export type RouteParams = {
    mainCatalog: never;
    seller: never;
    newProduct: never;
};
