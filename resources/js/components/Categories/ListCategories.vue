<template>
  <div class="container">

    <ModalAddCategory></ModalAddCategory>
    <hr />
      <table class="table table-bordered">
        <tr>
          <th> Category Name </th>
          <th> Category Desc </th>
          <th colspan="2"> Options </th>
        </tr>
        <tr v-for="category in categories" :key="category.category_id">
          <td> {{ category.category_name }} </td>
          <td> {{ category.category_desc }} </td>
          <td> <a @click="fetchSpecCategory(category.category_id)"  type="button" class="btn btn-secondary" data-toggle="modal" data-target="#modalEditCategory"> Edit </a>  </td>
          <td> <button class="btn btn-danger" @click="removeCategory(category.category_id, category.category_name)"> Remove </button></td>
        </tr>
       
      </table>
      <ModalEditCategory></ModalEditCategory>
     
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { ref, computed, onMounted } from 'vue'
import ModalAddCategory from '../Categories/ModalAddCategory'
import ModalEditCategory from '../Categories/ModalUpdateCategory'
export default {
    components: {
      ModalAddCategory,
      ModalEditCategory
    },
    setup() {
        const storeModule = useStore();

        onMounted(() => {
            storeModule.dispatch('fetchCategories');
        });

        function fetchSpecCategory(id) {
            storeModule.dispatch('fetchSpecificCategory', id);
            storeModule.dispatch('clearMessageBox');
        }

        
        function removeCategory(categoryID, categoryName) {
            if(confirm('Are you sure to remove this category? ' + categoryName)) {
                storeModule.dispatch('removeCategory', categoryID);
            }
        }

        const categories = computed(() => storeModule.state.categories.categoryList);

        return {
            categories,
            fetchSpecCategory,
            removeCategory
        };
    }
}
</script>

<style>

</style>