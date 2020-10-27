<template>
  <div id="productsListSection">
     
    <div class="row">
        <div class="col col-lg-4">
            <ModalAddProduct></ModalAddProduct>
        </div>
        <div class="col col-lg-4">
            <label> Search </label>
            <input type="text" v-model="searchItem" @keyup="searchProduct()" class="form-control">
        </div>
         <div class="col col-lg-4">
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
      <table class="table table-bordered">
          <tr>
              <th> Product Image </th>
              <th> Product Name </th>
              <th> Product Type </th>
              <th> Product Price </th>
              <th colspan="2"> Options </th>
          </tr>
          <tr v-for="product in products.data" :key="product.product_id">
              <td> <img :src="product.product_image" width="200" height="150" /> </td>
              <td> {{ product.product_name }} </td>
              <td> {{ product.product_type }} </td>
              <td> {{ product.product_price }} </td>
              <td> <a class="btn btn-secondary" @click="fetchSpecProduct(product.product_id)" type="button" data-toggle="modal" data-target="#modalEditProduct"> Edit </a> </td>
              <td> <button class="btn btn-danger" @click="removeItem(product.product_id, product.product_name)"> Remove </button></td>
          </tr>

      </table>
      <hr />

      <div class="pagination">
          <button class="btn btn-secondary mr-2" :disabled="products.prev_page_url == null" @click="fetchProductsAndCategories(products.prev_page_url)"> Previous </button>
          <button class="btn btn-secondary disabled mr-2"> {{ products.current_page }} of {{ products.last_page }} </button>
          <button class="btn btn-secondary" :disabled="products.next_page_url == null" @click="fetchProductsAndCategories(products.next_page_url)"> Next </button>
      </div>
        <ModalEditProduct></ModalEditProduct> 


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

        function removeItem(productID, productName) {
            if(confirm('Are you sure to remove this product? ' + productName)) {
                storeModule.dispatch('removeProduct', productID);
            }
        }

        return {
            products,
            fetchProductsAndCategories,
            fetchSpecProduct,
            removeItem,
            sortBy,
            searchItem,
            searchProduct
        };
    }
}
</script>

<style>

</style>