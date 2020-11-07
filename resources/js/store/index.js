import { createStore } from 'vuex'
import ProductsModule from './admin/products'
import CategoriesModule from './admin/categories'
import ArchivesModule from './admin/archives'
import LoginAndLogoutModule from './loginAndLogout'
import RegisterModule from './register'

export default createStore({
  modules: {
    'products': ProductsModule,
    'categories': CategoriesModule,
    'archives':  ArchivesModule,
    'loginAndlogout': LoginAndLogoutModule,
    'register': RegisterModule
  }
})
