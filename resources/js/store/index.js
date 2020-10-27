import { createStore } from 'vuex'
import ProductsModule from './admin/products'
import CategoriesModule from './admin/categories'
import ArchivesModule from './admin/archives'

export default createStore({
  modules: {
    'products': ProductsModule,
    'categories': CategoriesModule,
    'archives':  ArchivesModule
  }
})
