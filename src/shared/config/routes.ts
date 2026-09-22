import SellerProfile from "../../pages/PostDetailsPage/components/SellerProfile.tsx";
import AddProductPage from "../../pages/AddProductPage/AddProductPage.tsx";
import UserProductList from "../../pages/UserProductList/UserProductList.tsx";
import PostsPage from "../../pages/PostListPage/PostListPage.tsx";
import PostDetailsPage from "../../pages/PostDetailsPage/PostDetailsPage.tsx";
import AddPostPage from "../../pages/AddPostPage/AddPostPage.tsx";

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
        title: 'Новое объявление' },



    seller: {
        path: '/seller',
        component: SellerProfile,
        title: 'Профиль',
    },
    newProduct: {
        path: '/additem',
        component: AddProductPage,
        title: 'Добавление товара',
    },
    userListProduct: {
        path: '/profile',
        component: UserProductList,
        title: 'Мои объявления',
    },

} as const;

export type RouteKeys = keyof typeof ROUTES;

export type RouteParams = {
    mainCatalog: never;
    seller: never;
    newProduct: never;
};
