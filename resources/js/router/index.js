import { createRouter, createWebHistory  } from 'vue-router';
import LoginPage from '../views/Login';
import RegisterPage from '../views/Register';
import AdminHomepage from '../views/Admin/Homepage';
import ProductsPage from '../views/Admin/Products';
import CategoriesPage from '../views/Admin/Categories';
import ArchivePage from '../views/Admin/Archive';
import UserHomePage from '../views/User/Homepage';
import ProductsUserPage from '../components/Products/ListProductsUser'
import ViewProduct from '../components/Products/ViewProduct';
import CartPage from '../components/Cart/CartPage';
import CheckoutDetails from '../components/Checkout/Checkout';
import Profile from '../views/User/Profile';
import Courier from '../views/Admin/Courier';
import OrderPage from '../views/User/OrderPage';
import UserPage from '../views/Admin/Users'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Login',
            component: LoginPage,
            beforeEnter: (to, from, next) => {
                if (JSON.parse(localStorage.getItem('username')) !== '') {
                    if (JSON.parse(localStorage.getItem('username')) === 'admin') {
                        next({ name: 'AdminHome'})
                    }
                    else {
                        next({ name: 'UserHome'})
                    }
                }
               else {
                   next()
               }
            }
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
            beforeEnter: (to, from, next) => {
                if (JSON.parse(localStorage.getItem('username')) !== 'admin') next({ name: 'Login' })
                else next()
            }
        },
        {
            path: '/products',
            name: 'Products',
            component: ProductsPage,
            beforeEnter: (to, from, next) => {
                if (JSON.parse(localStorage.getItem('username')) !== 'admin') next({ name: 'Login' })
                else next()
            }
        },
        {
            path: '/categories',
            name: 'Categories',
            component: CategoriesPage,
            beforeEnter: (to, from, next) => {
                if (JSON.parse(localStorage.getItem('username')) !== 'admin') next({ name: 'Login' })
                else next()
            }
        },
        {
            path: '/archive',
            name: 'Archives',
            component: ArchivePage,
            beforeEnter: (to, from, next) => {
                if (JSON.parse(localStorage.getItem('username')) !== 'admin') next({ name: 'Login' })
                else next()
            }
        },
        {
            path: '/user',
            name: 'User',
            component: UserPage,
            beforeEnter: (to, from, next) => {
                if (JSON.parse(localStorage.getItem('username')) !== 'admin') next({ name: 'Login' })
                else next()
            }
        },

        {
            path: '/user/dashboard',
            name: 'UserHome',
            component: UserHomePage,
            beforeEnter: (to, from, next) => {
                if (JSON.parse(localStorage.getItem('username')).includes('user') == false) next({ name: 'Login' })
                else next()
            } 
        },
        {
            path: '/productlist',
            name: 'ProductsUser',
            component: ProductsUserPage,
            beforeEnter: (to, from, next) => {
                if (JSON.parse(localStorage.getItem('username')).includes('user') == false) next({ name: 'Login' })
                else next()
            }
        },
        {
            path: '/product/:product_id',
            name: 'ViewProduct',
            component: ViewProduct,
            beforeEnter: (to, from, next) => {
                if (JSON.parse(localStorage.getItem('username')).includes('user') == false) next({ name: 'Login' })
                else next()
            }
        },
        {
            path: '/cart',
            name: 'CartPage',
            component: CartPage,
            beforeEnter: (to, from, next) => {
                if (JSON.parse(localStorage.getItem('username')).includes('user') == false) next({ name: 'Login' })
                else next()
            }
        },
        {
            path: '/checkout',
            name: 'Checkout',
            component: CheckoutDetails,
            beforeEnter: (to, from, next) => {
                if (JSON.parse(localStorage.getItem('username')).includes('user') == false) next({ name: 'Login' })
                else next()
            }
        },
        {
            path: '/profile',
            name: 'Profile',
            component: Profile,
            beforeEnter: (to, from, next) => {
                if (JSON.parse(localStorage.getItem('username')).includes('user') == false) next({ name: 'Login' })
                else next()
            }
        },
        {
            path: '/courier',
            name: 'Courier',
            component: Courier,
            beforeEnter: (to, from, next) => {
                if (JSON.parse(localStorage.getItem('username')) !== 'admin') next({ name: 'Login' })
                else next()
            }
        },
        {
            path: '/order',
            name: 'Order',
            component: OrderPage,
            beforeEnter: (to, from, next) => {
                if (JSON.parse(localStorage.getItem('username')).includes('user') == false) next({ name: 'Login' })
                else next()
            }
        },
        // {
        //     path: '*'
        // }

    ]
});


export default router