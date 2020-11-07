import { createRouter, createWebHistory  } from 'vue-router';
import AdminHomepage from '../views/Admin/Homepage';
import ProductsPage from '../views/Admin/Products';
import CategoriesPage from '../views/Admin/Categories';
import ArchivePage from '../views/Admin/Archive';
import LoginPage from '../views/Login';
import RegisterPage from '../views/Register';

const routerLink = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Login',
            component: LoginPage
        },
        {
            path: '/registeruser',
            name: 'Register',
            component: RegisterPage
        },
        {
            path: '/admin/dashboard',
            name: 'AdminHome',
            component: AdminHomepage,
          
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