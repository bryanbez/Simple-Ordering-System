<template>

        <div class="modal" id="modalEditProduct" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title"> Edit Product No: {{ productToModify.product_id }} </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="alert alert-primary" v-show="message != null">
                {{ message }}
            </div>
            <div class="modal-body">
                <form action="" method="post" enctype="multipart/form-data">
                    <label for="product_image">Product Image</label><br />
                    <input type="file" v-on:change="uploadImage"><br />
                    <label for="txt_product_name"> Product Name </label>
                    <input type="text" name="txt_product_name" class="form-control" v-model="productToModify.product_name">
                    <label for="txt_product_desc"> Product Description </label>
                    <textarea name="txt_product_desc" class="form-control" cols="30" rows="10" v-model="productToModify.product_desc"> </textarea>
                    <label for="txt_product_price"> Product Price </label>
                    <input type="text" name="txt_product_price" class="form-control" v-model="productToModify.product_price">
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" type="button" @click="updateProduct()"> Update </button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
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

        const message = computed(() => storeModule.state.products.message);

        const productToModify = computed(() => storeModule.state.products.specificProduct)

        function updateProduct() {
            return storeModule.dispatch('updateProduct', productToModify)
        }

        function uploadImage(event) {
            var fileReader = new FileReader();
            fileReader.readAsDataURL(event.target.files[0]);
            fileReader.onload = (event) => {
               productToModify.value.product_image = event.target.result;
              
            }  
        }

        return {
            productToModify,
            updateProduct,
            message,
            uploadImage,
        }

    }
}
</script>

<style>

</style>