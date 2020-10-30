import { createRouter, createWebHistory  } from 'vue-router';
import AdminHomepage from '../views/Admin/Homepage';
import ProductsPage from '../views/Admin/Products';
import CategoriesPage from '../views/Admin/Categories';
import ArchivePage from '../views/Admin/Archive';
import LoginPage from '../views/Login';

const routerLink = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: LoginPage
        },
        {
            path: '/',
            name: 'Home',
            component: AdminHomepage
        },
        {
            path: '/products',
            name: 'Products',
            component: ProductsPage
        },
        {
            path: '/categories',
            name: 'Categories',
            component: CategoriesPage
        },
        {
            path: '/archive',
            name: 'Archives',
            component: ArchivePage
        }

    ]
});

export default routerLink