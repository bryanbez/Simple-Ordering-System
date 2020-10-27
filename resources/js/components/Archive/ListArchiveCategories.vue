<template>
  <div>
        <h3> Archive Categories </h3>
        <hr />
        <table class="table table-bordered">
            <tr>
            <th> Category Name </th>
            <th> Category Description </th>
            <th colspan="2"> Options </th>
            </tr>
            <tr v-for="category in archiveCategory" :key="category.category_id">
            <td> {{ category.category_name }} </td>
            <td> {{ category.category_desc }} </td>
            <td> <button class="btn btn-primary" @click="restoreCategory(category.category_id, category.category_name)"> Restore </button> </td>
            <td> <button class="btn btn-danger" @click="deleteCategory(category.category_id, category.category_name)"> Delete </button></td>
            </tr>
        
        </table>
     
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { ref, computed, onMounted } from 'vue'
export default {
    setup() {
        const storeModule = useStore();

        onMounted(() => {
            storeModule.dispatch('fetchArchiveCategories');
        });

        const archiveCategory = computed(() => storeModule.state.archives.archiveCategories);

        function restoreCategory(id, name) {
              if(confirm('Restore this category? ' + name)) {
                storeModule.dispatch('restoreCategoryAction', id);
            }
        }

        function deleteCategory(id, name) {
            if(confirm('Are you sure to delete this category? ' + name)) {
                storeModule.dispatch('deleteCategoryAction', id);
            }
        }

        return {
            archiveCategory,
            restoreCategory,
            deleteCategory
        }
    }
}
</script>

<style>

</style>