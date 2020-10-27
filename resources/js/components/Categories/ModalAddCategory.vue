<template>
<button type="button" class="btn btn-secondary" data-toggle="modal" data-target="#modalAddCategory"> Add Category </button>
   
        <div class="modal" id="modalAddCategory" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title"> Add Category </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="alert alert-primary" v-show="message">
                {{ message }}
            </div>
            <div class="modal-body">
                <form action="" method="post">
                    <label for="txt_category_name"> Category Name </label>
                    <input type="text" name="txt_category_name" class="form-control" v-model="categoryToAdd.category_name">
                
                    <label for="txt_category_desc"> Category Description </label>
                    <textarea name="txt_category_desc" class="form-control" cols="30" rows="10" v-model="categoryToAdd.category_desc"> </textarea>
                 
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" type="button" @click="addCategory()"> Add </button>
                <button type="button" class="btn btn-secondary" @click="clearTextboxes()" data-dismiss="modal">Close</button>
            </div>
            </div>
        </div>
        </div>

  
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
export default {
    setup() {
        const storeModule = useStore();
        const categoryToAdd = ref({
            category_name: '',
            category_desc: '',
        })
        const message = computed(() => storeModule.state.categories.message);

        function addCategory() {
            return storeModule.dispatch('createCategory', categoryToAdd.value)
        }

        function clearMessage() {
            message.value = ''
        }

        function clearTextboxes() {
           categoryToAdd.value = []
        }

        return {
            categoryToAdd,
            clearMessage,
            message,
            addCategory,
            clearTextboxes
        }

    }
}
</script>

<style>
input, textarea, select {
    margin-bottom: 1em;
}
</style>