<template>
<button type="button" class="btn btn-secondary" data-toggle="modal" data-target="#modalAddProduct"> Add Product </button>
   
        <div class="modal" id="modalAddProduct" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title"> Add Product </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="alert alert-primary" v-show="message != null">
                {{ message }}
            </div>
            <div class="modal-body">
                <form method="post" enctype="multipart/form-data">
                    <label for="product_image">Product Image</label><br />
                    <input type="file" v-on:change="uploadImage"><br />
                    <label for="txt_product_name"> Product Name </label>
                    <input type="text" name="txt_product_name" class="form-control" v-model="productToAdd.product_name">
                    <label for="txt_product_type"> Product Type </label>
                    <select class="form-control" name="txt_product_type" v-model="productToAdd.product_type">
                        <option v-for="category in fetchCategories" :key="category.category_id">{{ category.category_name }}</option>
                    </select>
                    <label for="txt_product_price"> Product Price </label>
                    <input type="text" name="txt_product_price" class="form-control" v-model.number="productToAdd.product_price">
                    <label for="txt_product_desc"> Product Description </label>
                    <textarea name="txt_product_desc" class="form-control" cols="30" rows="10" v-model="productToAdd.product_desc"> </textarea>
                 
                </form>
            </div>
            <div class="modal-footer">
               <button class="form-control btn btn-primary" @click="addProduct()"> Save </button>
                <button type="button" class="btn btn-secondary" @click="clearTextboxes()" data-dismiss="modal">Close</button>
            </div>
            </div>
        </div>
        </div>

  
</template>

<script>
import { reactive, computed } from 'vue'
import { useStore } from 'vuex'
export default {
    setup() {
        const storeModule = useStore();
        const productToAdd = reactive({
            product_image: '',
            product_name: '',
            product_type: '',
            product_desc: '',
            product_price: 0,
            deleted_at: null
        })
        const message = reactive(computed(() => storeModule.state.products.message));
        const fetchCategories = computed(() => storeModule.state.categories.categoryList);

        function addProduct() {
            return storeModule.dispatch('addProduct', productToAdd)
        }

        function clearTextboxes() {
            productToAdd.product_image = ''
            productToAdd.product_name = ''
            productToAdd.product_type = ''
            productToAdd.product_desc = '',
            productToAdd.product_price = ''
            storeModule.dispatch('clearMessage');
        }

        function uploadImage(event) {
            var fileReader = new FileReader();
            fileReader.readAsDataURL(event.target.files[0]);
            fileReader.onload = (event) => {
                productToAdd.product_image = event.target.result;
               
            }  
        }

        return {
            productToAdd,
            message,
            fetchCategories,
            addProduct,
            clearTextboxes,
            uploadImage
        }

    }
}
</script>

<style>
input, textarea, select {
    margin-bottom: 1em;
}
</style>