<template>
  <div>
        <h3> Archive Products </h3>
        <hr />
        <table class="table table-bordered">
            <tr>
            <th> Product Name </th>
            <th> Product Category </th>
            <th colspan="2"> Options </th>
            </tr>
            <tr v-for="product in archiveProduct" :key="product.product_id">
            <td> {{ product.product_name }} </td>
            <td> {{ product.product_type }} </td>
            <td> <button class="btn btn-primary" @click="restoreProduct(product.product_id, product.product_name)"> Restore </button> </td>
            <td> <button class="btn btn-danger" @click="deleteProduct(product.product_id, product.product_name)"> Delete </button></td>
            </tr>
        
        </table>
     
      <!-- {{ archiveCategory }} -->
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { ref, computed, onMounted } from 'vue'
export default {
    setup() {
        const storeModule = useStore();

        onMounted(() => {
            storeModule.dispatch('fetchArchiveProducts');
        });

        const archiveProduct = computed(() => storeModule.state.archives.archiveProducts);

        function restoreProduct(id, name) {
              if(confirm('Restore this product? ' + name)) {
                storeModule.dispatch('restoreProductAction', id);
            }
        }

        function deleteProduct(id, name) {
            if(confirm('Are you sure to delete this product? ' + name)) {
                storeModule.dispatch('deleteProductAction', id);
            }
        }

        return {
            archiveProduct,
            restoreProduct,
            deleteProduct
        }
    }
}
</script>

<style>

</style>