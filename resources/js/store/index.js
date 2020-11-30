import { createStore } from 'vuex'
import ProductsModule from './admin/products'
import CategoriesModule from './admin/categories'
import ArchivesModule from './admin/archives'
import LoginAndLogoutModule from './loginAndLogout'
import RegisterModule from './register'
import CartModule from './user/cart'
import CheckoutModule from './user/checkout'
import ProfileModule from './user/profile'
import CourierModule from './admin/courier'

export default createStore({
  modules: {
    'products': ProductsModule,
    'categories': CategoriesModule,
    'archives':  ArchivesModule,
    'loginAndlogout': LoginAndLogoutModule,
    'register': RegisterModule,
    'cart': CartModule,
    'checkout': CheckoutModule,
    'profile': ProfileModule,
    'courier': CourierModule
  }
})
