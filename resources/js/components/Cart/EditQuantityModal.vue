<template>
  <div>

        <div class="modal" id="modalEditQuantity" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title"> Update Quantity </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="alert alert-primary" v-show="errorMessage != ''">
                {{ errorMessage }}
            </div>
             <div class="alert alert-primary" v-show="cartMessage != ''">
                {{ cartMessage }}
            </div>
            <div class="modal-body">
                <form action="" method="post" enctype="multipart/form-data">
                    <label for="txt_quantity"> Quantity </label>
                    <input type="text" name="txt_quantity" class="form-control" v-model="cartInfo.quantity" >
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" type="button" @click="computeTotal(cartInfo.quantity, cartInfo.products.product_price)"> Update </button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
            </div>
        </div>
        </div>

  </div>
</template>

<script>
import { useStore } from 'vuex'
import { ref, computed, onMounted, watch } from 'vue'
export default {
    setup() {

        const storeModule = useStore();
        const cartInfo = computed(() => storeModule.state.cart.specificCartInfo)
        const errorMessage = computed(() => storeModule.state.cart.errorResponse)
        const cartMessage = computed(() => storeModule.state.cart.cartMessage)

        function computeTotal(qty, price) {
            const quantityAndPrice = ref({
                'quantity': qty,
                'price': price
            })
           storeModule.dispatch('changeQty', quantityAndPrice.value)
           updateCartQuantityAndPrice()
        }

        function updateCartQuantityAndPrice() {
            storeModule.dispatch('changeQuantityAndPriceOfCartItem')
        }   

        return {
            cartInfo,
            errorMessage,
            computeTotal,
            cartMessage
        }
    }
}
</script>

<style>

</style>