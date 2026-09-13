// shared/config/routes.ts

import CatalogPage from "../../pages/CatalogPage/CatalogPage.tsx";
import SellerProfile from "../../pages/ProductCard/components/SellerProfile.tsx";
import AddProductPage from "../../pages/AddProductPage/AddProductPage.tsx";
import UserProductList from "../../pages/UserProductList/UserProductList.tsx";

export const ROUTES = {
    mainCatalog: {
        path: '/',
        component: CatalogPage,
        title: 'Каталог товаров',
    },
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