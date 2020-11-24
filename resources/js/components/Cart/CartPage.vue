<template>
    <div>
        <h3> Your Cart </h3>
        <div class="alert alert-danger" v-show="cartRemoveMessage != ''">
            <div class="row">
                <div class="col col-lg-11">
                    {{ cartRemoveMessage }}
                </div>
                <div class="col col-lg-1">
                    <span class="close_msg" @click="clearCartRemoveMessage()"> x </span>
                </div>
            </div>
        </div>
        <table class="table table-bordered">
            <tr>
                <th> Product Image </th>
                <th> Product Name </th>
                <th> Quantity </th>
                <th> Price </th>
                <th colspan="2"> Options </th>
            </tr>
            <tr v-for="cart in cartList" :key="cart.cart_id">
                <td> <img :src="cart.products.product_image" width="200" height="150" /> </td>
                <td> {{ cart.products.product_name  }}</td>
                <td> {{ cart.quantity }} </td>
                <td> {{ cart.total_price }} </td>
                <td> <button class="btn btn-secondary" @click="showQuantityModel(cart.cart_id)" data-toggle="modal" data-target="#modalEditQuantity"> Edit Quantity </button> </td>
                <td> <button class="btn btn-danger" @click="removeCartItem(cart.cart_id)"> Remove </button> </td>
            </tr>
            <tr>
                <td colspan="3" style="font-size:22px;font-weight:bold"> Total Price: </td>
                <td style="font-size:22px;font-weight:bold"> {{ cartListPrice }} </td>
                <td colspan="2"> <button class="btn btn-primary"> Checkout </button> </td>
            </tr>
        </table>
        <ModalQuantity></ModalQuantity>

    </div>
</template>

<script>
import ModalQuantity from '../Cart/EditQuantityModal'
import { useStore } from 'vuex'
import { ref, computed, onMounted } from 'vue'
export default {
    components: {
        ModalQuantity
    }, 
    setup() {

        const storeModule = useStore();

        const cartList = computed(() => storeModule.state.cart.cartList)
        const errorMessage = computed(() => storeModule.state.cart.errorResponse)
        const cartRemoveMessage = computed(() => storeModule.state.cart.cartRemoveMsg)
        const cartListPrice = computed(() => storeModule.getters.totalPriceToCheckout);

        function showQuantityModel(cart_id) {
            storeModule.dispatch('getSpecificCartItemInfo', cart_id)
            storeModule.dispatch('clearCartMessage')
        }

        function clearCartRemoveMessage() {
            storeModule.dispatch('clearCartRemoveMessageAction')
        }

        function removeCartItem(cart_id) {
            if (confirm('Are you sure to remove this item?')) {
                storeModule.dispatch('removeCartItem', cart_id)
            }
        }

        onMounted(() => {
            storeModule.dispatch('getCartItems')
        });

        return {
            cartList,
            showQuantityModel,
            errorMessage,
            clearCartRemoveMessage,
            removeCartItem,
            cartRemoveMessage,
            cartListPrice
        }
    }

}
</script>

<style>
h3 {
    margin-top: 1em;
}
.close_msg {
    cursor: pointer
}
</style>