<template>
  <div>
     <h3> Products </h3>
      <div class="row">
        <div class="col col-lg-6">
            <label> Search </label>
            <input type="text" v-model="searchItem" @keyup="searchProduct()" class="form-control">
        </div>
         <div class="col col-lg-6">
            <label> Sort By</label>
            <select v-model="sortBy" class="form-control" @change="fetchProductsAndCategories()">
                <option value="product_name"> Name </option>
                <option value="product_type"> Product Type </option>
                <option value="product_price"> Price </option>
                <option value="reset_sort"> Reset Sort </option>
            </select>     
        </div>
    </div>
     <hr />

    <div class="row">
        <div v-for="product in products.data" :key="product.product_id">
            <div class="card mb-2 mr-2 ml-2" style="width: 16rem;">
            <img class="card-img-top" :src="product.product_image" width="200" height="200">
            <div class="card-body">
                <h5 class="card-title"> {{ product.product_name }} </h5>
                <p class="card-text"> {{ product.product_price }} pesos </p>
                <a href="#" class="btn btn-primary">Add To Cart</a>
            </div>
            </div>
        </div>

    </div>
    <br />
      <div class="pagination">
          <button class="btn btn-secondary mr-2" :disabled="products.prev_page_url == null" @click="fetchProductsAndCategories(products.prev_page_url)"> Previous </button>
          <button class="btn btn-secondary disabled mr-2"> {{ products.current_page }} of {{ products.last_page }} </button>
          <button class="btn btn-secondary" :disabled="products.next_page_url == null" @click="fetchProductsAndCategories(products.next_page_url)"> Next </button>
      </div>  
    
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { ref, computed, onMounted } from 'vue'
import ModalAddProduct from '../Products/ModalAddProduct';
import ModalEditProduct from '../Products/ModalEditProduct';
export default {
    components: {
       ModalEditProduct,
       ModalAddProduct
    },
    setup() {
        const storeModule = useStore();

        const products = computed(() => storeModule.state.products.productsList);
        const sortBy = ref('');
        const searchItem = ref('');

        function fetchSpecProduct(id) {
            storeModule.dispatch('fetchSpecificProduct', id);
            storeModule.dispatch('clearMessageBox')
        }
        onMounted(() => {
            fetchProductsAndCategories()
            storeModule.dispatch('fetchCategories');
        });

        function fetchProductsAndCategories(pageURL = '') {
            const urlToSend = {
                pageURL: pageURL,
                sortBy: sortBy.value
            }
            storeModule.dispatch('getProducts', urlToSend);
        }

        function searchProduct() {
            storeModule.dispatch('searchProductAction', searchItem.value);
        }


        return {
            products,
            fetchProductsAndCategories,
            fetchSpecProduct,
            sortBy,
            searchItem,
            searchProduct
        };
    }
}
</script>

<style>

</style>